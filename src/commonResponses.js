export let baseResponse = {
	username: 'Automation',
	icon_url: 'https://cdn.pixabay.com/photo/2016/01/03/11/24/gear-1119298_640.png',
	response_type: 'ephemeral',
};

export function badCommand() {
	let response = { ...baseResponse };
	response['text'] = 'Wrong command usage. Try `/quote man` or `/volley man` for more information.';
	return Response.json(response);
}

export function code(code, message = null) {
	return new Response(message, { status: code });
}
