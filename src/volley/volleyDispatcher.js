import { createPoll } from './createPoll';
import { confirmMatch } from './confirmMatch';
import { echo } from './echo';
import { man } from './man';

import { badCommand } from '../commonResponses';

export async function volleyDispatcher(env, ctx, body) {
	if (!body.has('text')) return badCommand();

	let text = body.get('text');
	const subCommand = text.split(' ', 1)[0];
	text = text.slice(subCommand.length + 1);

	switch (subCommand) {
		case 'create':
			return createPoll(env, ctx, text, body.get('response_url'));
		case 'confirm':
			return confirmMatch(env, text);
		case 'echo':
			return echo(env, text);
		case 'man':
			return man();
		default:
			return badCommand();
	}
}
