import { quoteNotFound, quoteslist } from './responses';

async function listquotes(env, body) {
	const quotes = await env.DB.prepare('SELECT * from quotes').all();

	if (quotes.success) {
		return quoteslist(quotes.results);
	}

	return quoteNotFound();
}

export { listquotes };
