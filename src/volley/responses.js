export let volleyResponse = {
	username: 'Volleyball',
	icon_url: 'https://i.pinimg.com/736x/84/36/cf/8436cf7032a6d1895c9834cb137107cb.jpg',
	response_type: 'ephemeral',
	text: '<!channel>',
};

export function volleyMessage(title, message) {
	let response = { ...volleyResponse };
	response['response_type'] = 'in_channel';
	response['attachments'] = [
		{
			color: '#FFFF00',
			title: title,
			text: message,
		},
	];
	return Response.json(response);
}

export async function matchConfirmation(dateString, link) {
	let response = { ...volleyResponse };
	response['response_type'] = 'in_channel';
	response['attachments'] = [
		{
			color: '#FFFF00',
			title: 'Announcement',
			text: `Volleyball game confirmed for ${dateString}!`,
			fields: [
				{
					short: true,
					title: '',
					value: `[📅 Add to Calendar](${link})`,
				},
			],
		},
	];
	return Response.json(response);
}

export function volleyMan(text) {
	let response = { ...volleyResponse };
	response['text'] = ''; // Override @channel tag
	response['attachments'] = [
		{
			color: '#FFFF00',
			text: text,
		},
	];
	return Response.json(response);
}
