import { badCommand } from '../commonResponses';
import { matchConfirmation } from './responses';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export async function confirmMatch(env, dateString) {
	const regex = /^(\d{1,2})-(\d{1,2})-(\d{4}) (\d{1,2}):(\d{2})$/;
	const match = dateString.match(regex);

	if (!match) return badCommand();

	const [, day, month, year, hour, minute] = match.map(Number);

	if (month < 1 || month > 12 || day < 1 || day > 31 || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
		return badCommand();
	}

	// NOTE: There is no need to pad hour or minute values
	const formattedDate = `${day} ${MONTHS[month - 1]} ${year} ${hour}%3A${minute}`;
	const link = `https://my.calendarlink.com/link?collection=${env.CL_COLLECTION}&title=Volleyball%20Match&start=${formattedDate}&duration=60 minutes&timezone=Europe%2FLisbon&location=Nave 2`;

	// TODO: Discord HOOK

	return matchConfirmation(dateString, link);
}
