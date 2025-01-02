import { getAllQuotes, getAllQuotesFromAuthor } from './db';
import { quoteNotFound, quoteslist } from './responses';

export async function listquotes(env, body) {
	const author = body.get('text');

	let quotes = null;

	if (author === null || author.length === 0) quotes = await getAllQuotes(env);
	else quotes = await getAllQuotesFromAuthor(env, author);

	if (quotes.success) {
		return quoteslist(quotes.results);
	}

	return quoteNotFound();
}
