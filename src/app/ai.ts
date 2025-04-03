import { createAI } from "ai/rsc";
import { type ServerMessage, type ClientMessage, sendMessage } from "./actions";
// import { ClientMessage, ServerMessage } from './actions';

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
	initialAIState: [] as AIState,
	initialUIState: [] as UIState,
	actions: {
		sendMessage,
	},
});
