let quotesResponse = {
	username: 'Quotes',
	icon_url: 'https://i.pinimg.com/474x/47/38/af/4738af8db46526a6677a96d3a1e0bee7.jpg',
	response_type: 'ephemeral',
};

function code(code, message = null) {
	return new Response(message, { status: code });
}

function quoteAdded(quote, author, year, addedBy) {
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

function quote(quote, author, year, addedBy) {
	let response = { ...quotesResponse };
	response['response_type'] = 'in_channel';
	response['attachments'] = [
		{
			color: '#FFA500',
			text: `"${quote}"`,
			footer: `${author}, ${year}`,
		},
	];
	return Response.json(response);
}

function quoteNotFound() {
	let response = { ...quotesResponse };
	response['text'] = 'No quote found!';
	return Response.json(response);
}

function badCommand() {
	let response = { ...quotesResponse };
	response['text'] = 'Wrong command usage. Try `\\help` for more information.';
	return Response.json(response);
}

export { code, quoteAdded, quote, quoteNotFound, badCommand };
