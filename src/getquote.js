import { quote, quoteNotFound } from './responses';

async function getRandomQuote(env) {
	return env.DB.prepare('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1').first();
}

async function getRandomQuoteByAuthor(env, author) {
	return env.DB.prepare('SELECT * FROM quotes WHERE author = ?1 ORDER BY RANDOM() LIMIT 1').bind(`${author}`).first();
}

async function getquote(env, body) {
	const author = body.get('text');

	let result = null;

	if (author === null || author.length === 0) result = await getRandomQuote(env);
	else result = await getRandomQuoteByAuthor(env, author);

	if (result !== null) return quote(result['quote'], result['author'], result['year'], result['addedBy']);

	return quoteNotFound();
}

export { getquote, quoteNotFound };
