import { code, badCommand } from './responses';
import { addquote } from './addquote';
import { getquote } from './getquote';
import { listquotes } from './listquotes';
import { sendDailyQuote } from './dailyquote';

export default {
	async fetch(request, env, ctx) {
		if (request.headers.get('content-type') !== 'application/x-www-form-urlencoded') return code(400, 'Content type not supported');

		const body = await request.formData();
		const token = body.get('token');
		const channel = body.get('channel_name');

		if (!env.ALLOWED_CHANNELS.includes(channel)) return code(403);

		const command = body.get('command');

		// TODO: In order to have distinct commands, Mattermost forces us to also have
		// multiple tokens. This will become difficult to manage if we keep adding new
		// commands. Perhaps we should change our approach and instead invoke commands like:
		// `/quote add`, `/quote get`, `/quote list`, etc..
		// This way, we have only one command and one token, and instead, the first command
		// argument dictates which action to take.
		switch (command) {
			case '/addquote':
				return token === env.ADDQUOTE_TOKEN ? addquote(env, body) : code(403);
			case '/getquote':
				return token === env.GETQUOTE_TOKEN ? getquote(env, body) : code(403);
			case '/listquotes':
				return token === env.LISTQUOTES_TOKEN ? listquotes(env, body) : code(403);
			default:
				return badCommand();
		}
	},

	async scheduled(event, env, ctx) {
		await sendDailyQuote(env);
	},
};
