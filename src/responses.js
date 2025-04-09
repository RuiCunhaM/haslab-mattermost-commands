export let quotesResponse = {
	username: 'Quotes',
	icon_url: 'https://i.pinimg.com/474x/47/38/af/4738af8db46526a6677a96d3a1e0bee7.jpg',
	response_type: 'ephemeral',
};

export function code(code, message = null) {
	return new Response(message, { status: code });
}

export function quoteAdded(quote, author, year, addedBy) {
	let response = { ...quotesResponse };
	response['response_type'] = 'in_channel';
	response['attachments'] = [
		{
			color: '#FFA500',
			text: `"${quote}"`,
			pretext: 'New quote added!',
			footer: `${author}, ${year}`,
		},
	];
	return Response.json(response);
}

export function quoteEdited(id, quote, author) {
	let response = { ...quotesResponse };
	response['response_type'] = 'in_channel';
	response['attachments'] = [
		{
			color: '#FFA500',
			text: `"${quote}"`,
			pretext: 'Quote edited!',
			footer: `${author} (ID: ${id})`,
		},
	];
	return Response.json(response);
}

export function quote(id, quote, author, year, addedBy) {
	let response = { ...quotesResponse };
	response['response_type'] = 'in_channel';
	response['attachments'] = [
		{
			color: '#FFA500',
			text: `"${quote}"`,
			footer: `${author}, ${year} (ID: ${id})`,
		},
	];
	return Response.json(response);
}

export function quotesList(quotes) {
	let response = { ...quotesResponse };
	response['response_type'] = 'in_channel';

	// NOTE: At some point in the future we need to paginate the output
	let mdQuotes = '|ID|Quote|Author|Year|\n|---|---|---|---|\n';
	quotes.forEach((quote) => {
		mdQuotes += `|${quote.id}|${quote.quote}|${quote.author}|${quote.year}|\n`;
	});

	response['attachments'] = [{ color: '#FFA500', text: mdQuotes }];

	return Response.json(response);
}

export function quoteNotFound() {
	let response = { ...quotesResponse };
	response['text'] = 'No quote found!';
	return Response.json(response);
}

export function badCommand() {
	let response = { ...quotesResponse };
	response['text'] = 'Wrong command usage. Try `\\help` for more information.';
	return Response.json(response);
}
