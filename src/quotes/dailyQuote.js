import { quotesResponse } from './responses';
import { getUnusedDailyQuote, quoteStats } from './db';

export async function sendDailyQuote(env) {
	const result = await getUnusedDailyQuote(env);

	// NOTE: If we fail to retrieve a quote we just "abort"
	// In the future we should perhaps handle this better
	if (result === null) return;

	const [nQuotes, nUsed] = await quoteStats(env);

	let payload = { ...quotesResponse };
	payload['attachments'] = [
		{
			color: '#FFA500',
			pretext: `Quote of the day!`,
			text: `"${result['quote']}"`,
			footer: `${result['author']}, ${result['year']} (ID: ${result['id']}, ${nUsed}/${nQuotes})`,
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
