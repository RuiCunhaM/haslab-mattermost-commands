import { getRandomQuote, getRandomQuoteByAuthor } from './db';
import { quote, quoteNotFound } from './responses';

export async function getQuote(env, author) {
	let result = null;

	if (author === null || author.length === 0) result = await getRandomQuote(env);
	else result = await getRandomQuoteByAuthor(env, author);

	if (result !== null) return quote(result['id'], result['quote'], result['author'], result['year'], result['addedBy']);

	return quoteNotFound();
}
