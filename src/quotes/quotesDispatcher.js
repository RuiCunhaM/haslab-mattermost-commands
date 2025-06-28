import { addQuote } from './addQuote';
import { editQuote } from './editQuote';
import { getQuote } from './getQuote';
import { listQuotes } from './listQuotes';
import { man } from './man';

import { badCommand } from '../commonResponses';

export async function quotesDispatcher(env, body) {
	if (!body.has('text')) return badCommand();

	let text = body.get('text');
	const subCommand = text.split(' ', 1)[0];
	text = text.slice(subCommand.length + 1);

	switch (subCommand) {
		case 'add':
			return addQuote(env, text, body.get('user_name'));
		case 'edit':
			return editQuote(env, text, body.get('user_name'));
		case 'get':
			return getQuote(env, text);
		case 'list':
			return listQuotes(env, text);
		case 'man':
			return man();
		default:
			return badCommand();
	}
}
