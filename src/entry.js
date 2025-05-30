import { sendDailyQuote } from './quotes/dailyQuote';
import { quotesDispatcher } from './quotes/quotesDispatcher';
import { volleyDispatcher } from './volley/volleyDispatcher';

import { code, badCommand } from './commonResponses';

export default {
	async fetch(request, env, ctx) {
		if (request.headers.get('content-type') !== 'application/x-www-form-urlencoded') return code(400, 'Content type not supported');

		const body = await request.formData();
		const token = body.get('token');
		const channel = body.get('channel_name');

		if (!env.ALLOWED_CHANNELS.includes(channel)) return code(403);

		const command = body.get('command');

		switch (command) {
			case '/quote':
				return token === env.QUOTE_TOKEN ? quotesDispatcher(env, body) : code(403);
			case '/volley':
				return token === env.VOLLEY_TOKEN ? volleyDispatcher(env, body) : code(403);
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
