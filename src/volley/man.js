import { volleyMan } from './responses';

const manText = `
# Volley Man

\`/volley create [current]\` -> Create a new poll
\`/volley confirm dd-mm-yyyy hh:mm\` -> Confirm a scheduled match
\`/volley "<title>" "<message>"\` -> Send a message
`;

export async function man() {
	return volleyMan(manText);
}
