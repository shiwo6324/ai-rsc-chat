"use client";
import ChatList from "@/components/chat-list";
import ChatScrollAnchor from "@/components/chat-scroll-anchor";
import { useForm } from "react-hook-form";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface FormData {
	message: string;
}

export default function Home() {
	const form = useForm<FormData>();
	const { formRef, onKeyDown } = useEnterSubmit();
	const onSubmit = (data: FormData) => {
		console.log(data);
		form.reset();
	};
	return (
		<main className="flex flex-col h-screen bg-muted/50">
			<div className="flex-1 overflow-y-auto p-4 md:p-6">
				<div className="max-w-2xl mx-auto">
					<ChatList messages={[]} />
					<ChatScrollAnchor />
				</div>
			</div>
			<div className="sticky bottom-0 left-0 right-0 w-full bg-background border-t p-4 md:p-6">
				<div className="max-w-2xl mx-auto">
					<form
						ref={formRef}
						onSubmit={form.handleSubmit(onSubmit)}
						className="relative flex items-center space-x-2 rounded-lg border bg-card p-2 shadow-sm"
					>
						<TextareaAutosize
							tabIndex={0}
							className="flex-1 min-h-[40px] resize-none bg-transparent p-2 focus-visible:outline-none sm:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
							autoFocus
							autoComplete="off"
							autoCapitalize="off"
							autoCorrect="off"
							spellCheck={false}
							onKeyDown={onKeyDown}
							rows={1}
							maxRows={5}
							placeholder="输入消息..."
							{...form.register("message", { required: true })}
						/>
						<div className="flex items-center">
							<Button
								type="submit"
								size="icon"
								disabled={
									!form.formState.isValid || form.formState.isSubmitting
								}
							>
								<Send className="h-4 w-4" />
								<span className="sr-only">发送</span>
							</Button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
