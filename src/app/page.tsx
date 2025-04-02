"use client";
import ChatList from "@/components/chat-list";
import ChatScrollAnchor from "@/components/chat-scroll-anchor";
import { useForm } from "react-hook-form";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
	const form = useForm();
	const { formRef, onKeyDown } = useEnterSubmit();
	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<main>
			<div className="pb-[200px] pt-4 md:pt-10">
				<ChatList messages={[]} />
				<ChatScrollAnchor />
				<div>
					<form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
						<TextareaAutosize
							tabIndex={0}
							className="w-full min-h-[60px] resize-none bg-transparent pr-16 py-[1.3rem]
							focus-within:outline-none sm:text-sm
							"
							autoFocus
							autoComplete="off"
							autoCapitalize="off"
							autoCorrect="off"
							spellCheck={false}
							onKeyDown={onKeyDown}
							rows={1}
							placeholder="Type your message here."
							{...form.register("message")}
						/>
						{/* <input {...form.register("message")} />
						<button type="submit">Send</button> */}
					</form>
				</div>
			</div>
		</main>
	);
}
