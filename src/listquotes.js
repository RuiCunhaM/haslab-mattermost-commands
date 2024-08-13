import { getAllQuotes } from './db';
import { quoteNotFound, quoteslist } from './responses';

export async function listquotes(env, body) {
	const quotes = await getAllQuotes(env);

	if (quotes.success) {
		return quoteslist(quotes.results);
	}

	return quoteNotFound();
}
