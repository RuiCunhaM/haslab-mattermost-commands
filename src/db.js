export async function addQuote(env, quote, author, year, addedBy) {
	const { changedDb } = (
		await env.DB.prepare('INSERT INTO quotes (quote, author, year, addedBy, dailyUsed) VALUES (?1, ?2, ?3, ?4, False)')
			.bind(quote, author, year, addedBy)
			.run()
	).meta;

	return changedDb;
}

export async function getAllQuotes(env) {
	return env.DB.prepare('SELECT * from quotes ORDER BY id').all();
}

export async function getAllQuotesFromAuthor(env, author) {
	return env.DB.prepare('SELECT * from quotes WHERE author = ?1 ORDER BY id').bind(author).all();
}

export async function getRandomQuote(env) {
	return env.DB.prepare('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1').first();
}

export async function getRandomQuoteByAuthor(env, author) {
	return env.DB.prepare('SELECT * FROM quotes WHERE author = ?1 ORDER BY RANDOM() LIMIT 1').bind(author).first();
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

export async function countTotalQuotes(env) {
	const r = await env.DB.prepare('SELECT COUNT(*) FROM quotes').first();
	return r['COUNT(*)'];
}

export async function countUsedQuotes(env) {
	const r = await env.DB.prepare('SELECT COUNT(*) FROM quotes WHERE dailyUsed = True').first();
	return r['COUNT(*)'];
}

export async function countUnusedQuotes(env) {
	const r = await env.DB.prepare('SELECT COUNT(*) FROM quotes WHERE dailyUsed = False').first();
	return r['COUNT(*)'];
}

export async function quoteStats(env) {
	const r = await env.DB.prepare('SELECT COUNT(*), SUM(dailyUsed) from quotes').first();
	const nQuotes = r['COUNT(*)'];
	const nUsed = r['SUM(dailyUsed)'];
	return [nQuotes, nUsed];
}
