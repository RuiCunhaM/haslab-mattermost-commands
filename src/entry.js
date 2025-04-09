import { code, badCommand } from './responses';
import { addQuote } from './addquote';
import { getQuote } from './getquote';
import { listQuotes } from './listquotes';
import { sendDailyQuote } from './dailyquote';
import { editQuote } from './editquote';

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
				return token === env.ADDQUOTE_TOKEN ? addQuote(env, body) : code(403);
			case '/getquote':
				return token === env.GETQUOTE_TOKEN ? getQuote(env, body) : code(403);
			case '/listquotes':
				return token === env.LISTQUOTES_TOKEN ? listQuotes(env, body) : code(403);
			case '/editquote':
				return token === env.EDITQUOTE_TOKEN ? editQuote(env, body) : code(403);
			default:
				return badCommand();
		}
	},

	async scheduled(event, env, ctx) {
		const ptHour = new Date().toLocaleString('en-GB', {
			timeZone: 'Europe/Lisbon',
			hour: '2-digit',
			hour12: false,
		});

		if (ptHour === '09') await sendDailyQuote(env);
	},
};
