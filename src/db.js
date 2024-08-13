export async function addQuote(env, quote, author, year, addedBy) {
	const { changed_db } = (
		await env.DB.prepare('INSERT INTO quotes (quote, author, year, addedBy, dailyUsed) VALUES (?1, ?2, ?3, ?4, False)')
			.bind(quote, author, year, addedBy)
			.run()
	).meta;

	return changed_db;
}

export async function getAllQuotes(env) {
	return env.DB.prepare('SELECT * from quotes').all();
}

export async function getRandomQuote(env) {
	return env.DB.prepare('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1').first();
}

export async function getRandomQuoteByAuthor(env, author) {
	return env.DB.prepare('SELECT * FROM quotes WHERE author = ?1 ORDER BY RANDOM() LIMIT 1').bind(`${author}`).first();
}

export async function getUnusedDailyQuote(env) {
	let result = await env.DB.prepare('SELECT * FROM quotes WHERE dailyUsed = False ORDER BY RANDOM() LIMIT 1').first();

	if (result === null) {
		await env.DB.prepare('UPDATE quotes SET dailyUsed = False').run();
		result = await env.DB.prepare('SELECT * FROM quotes WHERE dailyUsed = False ORDER BY RANDOM() LIMIT 1').first();
	}

	await env.DB.prepare('UPDATE quotes SET dailyUsed = True WHERE id = ?1').bind(result['id']).run();

	return result;
}
