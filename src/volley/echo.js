import { volleyMessage } from './responses';
import { badCommand } from '../commonResponses';
import { sendDiscordMessage } from './discord';

export async function echo(env, text) {
	const regexp = '"[^"]*"';
	const args = [...text.matchAll(regexp)];

	if (args.length !== 2) return badCommand();
	const [[title], [message]] = args.map((x) => x.map((y) => y.slice(1, -1)));

	await sendDiscordMessage(env, title, message);

	return volleyMessage(title, message);
}
