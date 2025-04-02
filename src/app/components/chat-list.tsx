import React from "react";
import type { UIState } from "../ai";

// interface MessagesProps {
// 	messages: UIState;
// }

const ChatList = ({ messages }: { messages: UIState }) => {
	if (!messages.length) return null;

	return (
		<div className="relative mx-auto max-w-2xl px-4">
			{messages.map((message) => (
				<div key={message.id} className="pb-4">
					{message.display}
				</div>
			))}
		</div>
	);
};

export default ChatList;
