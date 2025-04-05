"use server";

import type { ReactNode } from "react";
import type { ToolInvocation } from "ai";
import { getMutableAIState, streamUI } from "ai/rsc";
import type { AI } from "./ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { BotCard, BotMessage } from "./components/llm/message";
import { Loader2 } from "lucide-react";
import { env } from "@/env";
import Price from "./components/price";

// const binance = new MainClient({
// 	apiKey: env.BINANCE_API_KEY,
// 	apiSecret: env.BINANCE_API_SECRET,
// });

const openai = createOpenAI({
	baseURL: env.OPENAI_BASE_URL,
	apiKey: env.OPENAI_API_KEY,
});

// Define the AI state and UI state types
export type ServerMessage = {
	id?: string;
	role: "user" | "assistant" | "system";
	content: string;
	name?: "get_crypto_price" | "get_crypto_stats";
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

export const sendMessage = async (
	message: string,
): Promise<{ id: string; role: "user" | "assistant"; display: ReactNode }> => {
	const history = getMutableAIState<typeof AI>();
	history.update([
		...history.get(),
		{
			role: "user",
			content: message,
		},
	]);

	const reply = await streamUI({
		model: openai("gpt-4o-mini"),
		messages: [
			{
				role: "system",
				content,
				toolInvocations: [],
			},
			...history.get(),
		],
		initial: (
			<BotMessage>
				<Loader2 className="animate-spin" />
			</BotMessage>
		),
		text: ({ content, done }) => {
			if (done)
				history.done([
					...history.get(),
					{
						role: "assistant",
						content,
					},
				]);
			return <BotCard showAvatar={true}>{content}</BotCard>;
		},
		tools: {
			get_crypto_price: {
				description:
					"Get the current price of a given cryptocurrency. Use this to show the price to the user.",
				parameters: z.object({
					symbol: z
						.string()
						.describe(
							"The name or symbol of the cryptocurrency. e.g. BTC/ETH/SOL.",
						),
				}),

				generate: async function* ({ symbol }: { symbol: string }) {
					yield <BotCard>loading...</BotCard>;
					// const stats = await biance.getCryptoStats(symbol);

					const sleep = (ms: number) =>
						new Promise((resolve) => setTimeout(resolve, ms));
					await sleep(1000);

					history.done([
						...history.get(),
						{
							role: "assistant",
							name: "get_crypto_price",
							content: `[Price of ${symbol} = 100000]`,
						},
					]);
					return (
						<BotCard>
							<Price price={100000} symbol={symbol} />
						</BotCard>
					);
				},
			},
			get_crypto_stats: {
				description:
					"Get the current stats of a given cryptocurrency. Use this to show the stats to the user.",
				parameters: z.object({
					slug: z
						.string()
						.describe(
							"The full name of the cryptocurrency in lowercase. e.g. bitcoin/ethereum/solana.",
						),
				}),
				generate: async function* ({ slug }: { slug: string }) {
					yield <BotCard>loading...</BotCard>;
					const url = new URL(
						"https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail",
					);
					console.log("slug____________________++", slug);
					url.searchParams.set("slug", slug);
					url.searchParams.set("limit", "1");
					url.searchParams.set("sortby", "market_cap");
					url.searchParams.set("sort_type", "desc");

					const response = await fetch(url, {
						headers: {
							// set the headers
							Accept: "application/json",
							"Content-Type": "application/json",
							"X-CMC_PRO_API_KEY": env.CMC_API_KEY,
						},
					});
					if (!response.ok) {
						history.done([
							...history.get(),
							{
								role: "assistant",
								content: "Error fetching data",
								name: "get_crypto_stats",
							},
						]);
						return <BotMessage>Error fetching data</BotMessage>;
					}
					const res = (await response.json()) as {
						data: {
							id: number;
							name: string;
							symbol: string;
							volume: number;
							volumeChangePercentage24h: number;
							statistics: {
								rank: number;
								totalSupply: number;
								marketCap: number;
								marketCapDominance: number;
							};
						};
					};

					const data = res.data;
					const stats = res.data.statistics;

					const marketStats = {
						name: data.name,
						volume: data.volume,
						volumeChangePercentage24h: data.volumeChangePercentage24h,
						rank: stats.rank,
						marketCap: stats.marketCap,
						totalSupply: stats.totalSupply,
						dominance: stats.marketCapDominance,
					};

					return <BotCard>stats</BotCard>;
				},
			},
		},
	});

	return {
		id: crypto.randomUUID(),
		role: "assistant",
		display: reply.value,
	};
};
