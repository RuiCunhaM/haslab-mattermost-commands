import { code, quoteAdded, badCommand } from './responses';

async function addquote(env, body) {
	if (!body.has('text')) return badCommand();

	// TODO: We should change the command format
	const regexp = '"[^"]*"';
	const args = [...body.get('text').matchAll(regexp)];

	if (args.length !== 3) return badCommand();

	const [[quote], [author], [year]] = args.map((x) => x.map((y) => y.slice(1, -1)));
	const addedBy = body.get('user_name');

	const { changed_db } = (
		await env.DB.prepare('INSERT INTO quotes (quote, author, year, addedBy, dailyUsed) VALUES (?1, ?2, ?3, ?4, False)')
			.bind(quote, author, year, addedBy)
			.run()
	).meta;

	if (changed_db) {
		return quoteAdded(quote, author, year, addedBy);
	}

	return code(500, 'Failed to add Quote');
}

export { addquote };
