import { getQuoteById, updateQuote } from './db';
import { quoteEdited } from './responses';
import { code, badCommand } from '../commonResponses';

export async function editQuote(env, body, text) {
	// TODO: We should change the command format
	const regexp = '"[^"]*"';
	const args = [...text.matchAll(regexp)];

	// TODO: Allow variable length for option arguments (year)
	if (args.length !== 2) return badCommand();

	const [[id], [new_quote]] = args.map((x) => x.map((y) => y.slice(1, -1)));
	const editor = body.get('user_name');

	const existingQuote = await getQuoteById(env, id);

	if (!existingQuote) {
		return code(404, `Quote ${id} does not exist`);
	}

	// Only the person who added the quote is allowed to edit it
	if (existingQuote['addedBy'] !== editor) {
		return code(401, `You are not allowed to edit quote ${id}`);
	}

	const changedDb = await updateQuote(env, id, new_quote);

	if (!changedDb) {
		return code(500, 'Failed to edit quote');
	}

	return quoteEdited(id, new_quote, existingQuote['author']);
}
