import { useEffect, useState } from "react";

/**
 * 用于检测用户是否已滚动到页面底部。
 * @param offset - 一个可选的偏移量（以像素为单位）。如果滚动位置距离页面底部小于此偏移量，则认为用户在底部。默认为 0。
 * @returns 一个布尔值，指示用户是否在页面底部。
 */
export function useAtButton(offset = 0) {
	// 状态变量，用于存储用户是否在页面底部
	const [isAtBottom, setIsAtBottom] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// 检查窗口的内部高度加上当前的垂直滚动位置是否大于或等于
			// 文档的总高度减去指定的偏移量。
			// 如果是，则表示用户已滚动到页面底部（或接近底部，取决于偏移量）。
			setIsAtBottom(
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - offset,
			);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [offset]);

	// 返回表示用户是否在页面底部的状态
	return isAtBottom;
}
