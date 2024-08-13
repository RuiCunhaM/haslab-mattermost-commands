import { addQuote } from './db';
import { code, quoteAdded, badCommand } from './responses';

export async function addquote(env, body) {
	if (!body.has('text')) return badCommand();

	// TODO: We should change the command format
	const regexp = '"[^"]*"';
	const args = [...body.get('text').matchAll(regexp)];

	if (args.length !== 3) return badCommand();

	const [[quote], [author], [year]] = args.map((x) => x.map((y) => y.slice(1, -1)));
	const addedBy = body.get('user_name');

	const changed_db = await addQuote(env, quote, author, year, addedBy);

	if (changed_db) {
		return quoteAdded(quote, author, year, addedBy);
	}

	return code(500, 'Failed to add Quote');
}
