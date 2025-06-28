import { quotesMan } from './responses';

const manText = `
# Quotes Man

\`/quote add "<quote>" "<@author>" "<year>"\` -> Add a new quote
\`/quote edit "<ID>" "<new quote>"\` -> Edit a quote
\`/quote get [@author]\` -> Get a random quote
\`/quote list [@author]\` -> List all quotes
\`/quote man\` -> Display this message
`;

export async function man() {
	return quotesMan(manText);
}
