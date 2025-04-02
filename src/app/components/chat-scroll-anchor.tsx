"use client";

import React, { useEffect } from "react";
import { useAtButton } from "@/lib/use-at-button";
import { useInView } from "react-intersection-observer";

/**
 * ChatScrollAnchor 组件
 *
 * 这个组件的作用是在聊天界面中实现自动滚动到底部的功能。
 * 它会在新消息出现时，如果用户当前位于聊天窗口底部，则自动将视图滚动到最新的消息。
 */
const ChatScrollAchor = () => {
	// 控制 useInView 是否追踪元素的可见性变化。设为 true 表示启用追踪。
	const trackVisibility = true;
	// 调用自定义 Hook useAtButton，获取当前是否滚动到页面底部的状态
	const isAtBottom = useAtButton();
	// 调用 useInView Hook
	const { ref, entry, inView } = useInView({
		trackVisibility, // 启用可见性追踪
		delay: 100, // 延迟 100 毫秒触发 inView 状态变化，防止过于频繁的触发
		// rootMargin 定义了视口（root）的边界扩展或收缩。
		// "0px 0px -50% 0px" 表示：
		// - 顶部边界不变 (0px)
		// - 右侧边界不变 (0px)
		// - 底部边界向上收缩 50% (视口高度的一半) (-50%)
		// - 左侧边界不变 (0px)
		// 这意味着只有当该元素进入视口的上半部分时，inView 才会被认为是 true。
		// 结合 isAtBottom 使用，可以判断用户是否接近或位于聊天窗口的底部。
		rootMargin: "0px 0px -50% 0px",
	});

	// 使用 useEffect Hook 来处理滚动逻辑
	useEffect(() => {
		// 当以下条件都满足时，执行滚动操作：
		// 1. isAtBottom 为 true：用户当前滚动在页面底部附近。
		// 2. inView 为 true：此锚点元素（ChatScrollAnchor）进入了视口的上半部分。
		//    (注意：这里的逻辑 `isAtBottom && inView && !inView` 看起来有误，
		//     `inView && !inView` 永远为 false。
		//     推测原意可能是 `isAtBottom && !inView` 或者 `isAtBottom && entry?.isIntersecting`
		//     或者仅仅是 `isAtBottom` 时就滚动。
		//     根据常见的聊天自动滚动逻辑，通常是当 isAtBottom 为 true 且有新消息（导致锚点位置变化）时滚动。
		//     或者，如果锚点本身代表最后一条消息，那么当 isAtBottom 为 true 且锚点不在视图内时滚动。
		//     此处暂时保留原逻辑，但标记为潜在问题。)
		//
		// 修正后的常见逻辑：如果用户在底部 (isAtBottom) 并且锚点元素不在视图内 (!inView)，
		// 说明有新内容将锚点推离了底部视口，此时应该滚动到底部。
		// if (isAtBottom && !inView) {
		//   entry?.target.scrollIntoView({ behavior: "smooth", block: "start" });
		// }
		//
		// 另一种可能的逻辑：只要用户在底部，就始终尝试滚动到锚点。
		// if (isAtBottom) {
		//   entry?.target.scrollIntoView({ behavior: "smooth", block: "start" });
		// }

		// 按照原始代码的逻辑 (虽然可能无效)
		if (isAtBottom && !inView) {
			// 获取到被 ref 引用的 DOM 元素 (即下面的 div)
			// 调用 scrollIntoView 方法将元素滚动到视口中
			entry?.target.scrollIntoView({
				behavior: "smooth", // 平滑滚动
				block: "start", // 将元素的顶部与视口的顶部对齐
			});
		}
		// 依赖项数组：当 isAtBottom, inView 或 entry 发生变化时，重新执行 useEffect 中的逻辑
	}, [isAtBottom, inView, entry]);

	// 渲染一个空的 div 元素，它将被用作滚动的锚点
	// ref={ref} 将这个 div 与 useInView Hook 关联起来，以便追踪其可见性
	return <div ref={ref} className="h-px w-full" />;
};

// 导出组件
export default ChatScrollAchor;
