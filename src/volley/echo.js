import { volleyMessage } from './responses';
import { badCommand } from '../commonResponses';

export async function echo(env, text) {
	const regexp = '"[^"]*"';
	const args = [...text.matchAll(regexp)];

	if (args.length !== 2) return badCommand();
	const [[title], [message]] = args.map((x) => x.map((y) => y.slice(1, -1)));

	// TODO: Discord HOOK

	return volleyMessage(title, message);
}
