import { cn } from "@/lib/utils";
import { BotIcon, Sparkle, UserIcon } from "lucide-react";

export const UserMessage = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<UserIcon />
			{children}
		</div>
	);
};

export const BotMessage = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<BotIcon />
			{children}
		</div>
	);
};

export const BotCard = ({
	children,
	showAvatar = true,
}: { children: React.ReactNode; showAvatar: boolean }) => {
	return (
		<div className="group relative flex items-center md:-ml-12">
			<div
				className={cn(
					"w-4 h-4 text-muted-foreground",
					!showAvatar && "invisible",
				)}
			>
				<Sparkle />
			</div>
			<div className="">{children}</div>
		</div>
	);
};

export const AssistantMessage = ({
	children,
}: { children: React.ReactNode }) => {
	return <div>{children}</div>;
};
