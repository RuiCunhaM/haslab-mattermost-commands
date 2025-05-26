import { getAllQuotes, getAllQuotesFromAuthor } from './db';
import { quoteNotFound, quotesList } from './responses';

export async function listQuotes(env, author) {
	let quotes = null;

	if (author === null || author.length === 0) quotes = await getAllQuotes(env);
	else quotes = await getAllQuotesFromAuthor(env, author);

	if (!quotes.success || quotes.results.length == 0) return quoteNotFound();

	return quotesList(quotes.results);
}
