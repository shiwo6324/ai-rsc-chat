"use server";

import type { ReactNode } from "react";
import type { ToolInvocation } from "ai";
// Define the AI state and UI state types
export type ServerMessage = {
	id?: string;
	role: "user" | "assistant" | "system";
	content: string;
	name: "get_crypto_price" | "get_crypto_stats";
};

export type ClientMessage = {
	id: string;
	role: "user" | "assistant";
	display: ReactNode;
	toolInvocations?: ToolInvocation[];
};

const content = `\
You are a crypto bot and you can help users get the prices of cryptocurrencies.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of BTC = 69000]" means that the interface of the cryptocurrency price of BTC is shown to the user.

If the user wants the price, call \`get_crypto_price\` to show the price.
If the user wants the market cap or other stats of a given cryptocurrency, call \`get_crypto_stats\` to show the stats.
If the user wants a stock price, it is an impossible task, so you should respond that you are a demo and cannot do that.
If the user wants to do anything else, it is an impossible task, so you should respond that you are a demo and cannot do that.

Besides getting prices of cryptocurrencies, you can also chat with users.
`;

export const sendMessage = async (input: string): Promise<ClientMessage> => {
	"use server";
};
