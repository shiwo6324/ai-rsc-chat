import { useRef, type RefObject } from "react";

/**
 * 自定义 React Hook，用于在文本区域（textarea）中按下 Enter 键时提交表单。
 * @returns 返回一个包含表单引用（formRef）和键盘按下事件处理函数（onKeyDown）的对象。
 */
export function useEnterSubmit(): {
	formRef: RefObject<HTMLFormElement | null>; // 指向表单元素的 Ref 对象
	onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void; // 文本区域的键盘按下事件处理函数
} {
	// 创建一个 Ref 对象来引用表单元素
	const formRef = useRef<HTMLFormElement | null>(null);

	/**
	 * 处理文本区域中的键盘按下事件。
	 * @param event 键盘事件对象。
	 */
	const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		// 检查是否按下了 Enter 键，并且没有同时按下 Shift 键
		// event.nativeEvent.isComposing 检查用户是否正在使用输入法编辑器（如中文输入法）
		// 如果正在输入，则不提交表单
		if (
			event.key === "Enter" &&
			!event.shiftKey &&
			!event.nativeEvent.isComposing
		) {
			event.preventDefault();
			formRef.current?.requestSubmit();
		}
	};

	// 返回表单引用和事件处理函数
	return { formRef, onKeyDown };
}
