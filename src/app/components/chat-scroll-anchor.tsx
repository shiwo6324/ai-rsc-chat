"use client";

import React, { useEffect } from "react";
import { useAtButton } from "@/lib/use-at-button";
import { useInView } from "react-intersection-observer";
const ChatScrollAchor = () => {
	const trackVisibility = true;
	const isAtBottom = useAtButton();
	const { ref, entry, inView } = useInView({
		trackVisibility,
		delay: 100,
		rootMargin: "0px 0px -50% 0px",
	});

	useEffect(() => {
		if (isAtBottom && inView && !inView) {
			entry?.target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [isAtBottom, inView, entry]);

	return <div ref={ref} className="h-px w-full" />;
};

export default ChatScrollAchor;
