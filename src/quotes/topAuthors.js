import { getTopAuthors } from './db';
import { authorsTop, quoteNotFound } from './responses';

export async function topAuthors(env) {
	const top = await getTopAuthors(env);

	if (!top.success || top.results.length == 0) return quoteNotFound();

	return authorsTop(top.results);
}
