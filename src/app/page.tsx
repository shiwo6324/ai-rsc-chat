import Image from "next/image";
import { env } from "@/app/env.mjs";
import ChatList from "./components/chat-list";
export default function Home() {
	return (
		<main>
			<div className="pb-[200px] pt-4 md:pt-10">
				<ChatList messages={[]} />
			</div>
		</main>
	);
}
