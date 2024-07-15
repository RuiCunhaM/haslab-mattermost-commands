import { quotesResponse } from './responses';
import { getRandomQuote } from './getquote';

async function sendDailyQuote(env) {
	const result = await getRandomQuote(env);

	// NOTE: If we fail to retrieve a quote we just "abort"
	// In the future we should perhaps handle this better
	if (result === null) return;

	let payload = { ...quotesResponse };
	payload['attachments'] = [
		{
			color: '#FFA500',
			pretext: 'Quote of the day!',
			text: `"${result['quote']}"`,
			footer: `${result['author']}, ${result['year']}`,
		},
	];

	const init = {
		body: JSON.stringify(payload),
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	};

	// TODO: Check response
	const response = await fetch(env.DAILY_QUOTE_HOOK, init);
}

export { sendDailyQuote };
