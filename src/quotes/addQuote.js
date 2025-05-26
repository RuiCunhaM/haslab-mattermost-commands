import { insertQuote } from './db';
import { quoteAdded } from './responses';
import { code, badCommand } from '../commonResponses';

export async function addQuote(env, body, text) {
	// TODO: We should change the command format
	const regexp = '"[^"]*"';
	const args = [...text.matchAll(regexp)];

	// TODO: We should make the quote year an optional argument. If not present,
	// we should assume the current year.
	if (args.length !== 3) return badCommand();

	const [[quote], [author], [year]] = args.map((x) => x.map((y) => y.slice(1, -1)));
	const addedBy = body.get('user_name');

	const changedDb = await insertQuote(env, quote, author, year, addedBy);

	if (changedDb) {
		return quoteAdded(quote, author, year, addedBy);
	}

	return code(500, 'Failed to add Quote');
}
