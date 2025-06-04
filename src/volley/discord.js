export async function sendDiscordMessage(env, title, message) {
	await fetch(env.DISCORD_HOOK, {
		method: 'POST',
		body: JSON.stringify({
			content: '@here',
			embeds: [
				{
					title: title,
					description: message,
					color: 16776960,
					fields: [],
				},
			],
		}),
	});
}

export async function sendDiscordConfirmation(env, dateString, link) {
	await fetch(env.DISCORD_HOOK, {
		method: 'POST',
		body: JSON.stringify({
			content: '@here',
			embeds: [
				{
					title: 'Announcement',
					description: `Volleyball game confirmed for ${dateString}`,
					color: 16776960,
					fields: [
						{
							name: '',
							value: `[📅 Add to Calendar](${link})`,
						},
					],
				},
			],
		}),
	});
}
