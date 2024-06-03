import { code, badCommand } from './responses';
import { addquote } from './addquote';
import { getquote } from './getquote';

export default {
	async fetch(request, env, ctx) {
		if (request.headers.get('content-type') !== 'application/x-www-form-urlencoded') return code(400, 'Content type not supported');

		const body = await request.formData();
		const token = body.get('token');
		const channel = body.get('channel_name');

		if (!env.ALLOWED_CHANNELS.includes(channel)) return code(403);

		const command = body.get('command');

		switch (command) {
			case '/addquote':
				return token === env.ADDQUOTE_TOKEN ? addquote(env, body) : code(403);
			case '/getquote':
				return token === env.GETQUOTE_TOKEN ? getquote(env, body) : code(403);
			default:
				return badCommand();
		}
	},
};
