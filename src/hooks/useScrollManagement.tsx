import { useCallback } from "react";
import type { EditorModel } from "../model/editorModel";

export enum ScrollDirection {
	Up = "up",
	Down = "down",
}

/**
 * A custom hook for managing scroll position within a text editor component.
 */
export const useScrollManagement = (
	editorRef: React.RefObject<HTMLDivElement>,
	editorModelRef: React.RefObject<EditorModel>,
	LINE_HEIGHT: number,
	SCROLL_OFFSET: number,
) => {
	const scrollToCursorIfNeeded = useCallback(
		(direction: ScrollDirection) => {
			const model = editorModelRef.current;
			const content = editorRef.current;
			const cursorPosition = model?.getCursorPosition();
			const cursorElement = document.querySelector(
				`[data-line-number="${cursorPosition?.line}"]`,
			);

			if (!cursorPosition || !content || !cursorElement) return;

			const paddingBottom = Number(
				window.getComputedStyle(content).paddingBottom.replace("px", ""),
			);
			const editorWrapper = document.querySelector(".editor-wrapper");

			if (!editorWrapper) return;

			if (
				direction === ScrollDirection.Up &&
				elementIsAboveView(cursorElement)
			) {
				scrollElementIntoView(
					cursorElement,
					"start",
					editorWrapper,
					-SCROLL_OFFSET,
				);
			} else if (
				direction === ScrollDirection.Down &&
				elementIsBelowView(cursorElement, paddingBottom)
			) {
				scrollElementIntoView(cursorElement, "end", editorWrapper, LINE_HEIGHT);
			}
		},
		[editorModelRef, editorRef, LINE_HEIGHT, SCROLL_OFFSET],
	);

	const handleEnterScroll = useCallback(() => {
		const model = editorModelRef.current;
		const content = editorRef.current;
		const lastLine = content?.lastChild;
		const cursorPosition = model?.getCursorPosition();

		if (!cursorPosition || !content) return;

		const cursorElement = document.querySelector(
			`[data-line-number="${cursorPosition?.line - 1}"]`,
		);
		const editorBottom = content?.getBoundingClientRect().bottom;
		const style = window.getComputedStyle(content);
		const paddingBottom = Number(style.paddingBottom.replace("px", ""));
		const editorWrapper = document.querySelector(".editor-wrapper");

		if (
			!editorWrapper ||
			!cursorElement ||
			!lastLine ||
			!(lastLine instanceof Element) ||
			!content
		)
			return;

		if (elementIsAtBottomOfView(cursorElement, editorBottom, paddingBottom)) {
			// We are at the bottom of the visible part of the editor
			const lastLineBottom = lastLine.getBoundingClientRect().bottom;

			// Check if the last line is below the bottom of the content view
			if (lastLineBottom > editorBottom - paddingBottom) {
				// Check if user scrolled past content and preserve
				if (lastLineBottom + LINE_HEIGHT > paddingBottom) {
					scrollElementIntoView(
						lastLine,
						"end",
						editorWrapper,
						LINE_HEIGHT * 2,
					);
				}
			}
		} else {
			// Check if we are going offscreen
			scrollToCursorIfNeeded(ScrollDirection.Down);
		}
	}, [editorModelRef, editorRef, scrollToCursorIfNeeded, LINE_HEIGHT]);

	const elementIsAboveView = useCallback(
		(element: Element) => {
			return (
				element.getBoundingClientRect().bottom < SCROLL_OFFSET + LINE_HEIGHT / 2
			);
		},
		[LINE_HEIGHT, SCROLL_OFFSET],
	);

	const elementIsBelowView = useCallback(
		(element: Element, paddingBottom: number) => {
			return element.getBoundingClientRect().bottom > paddingBottom;
		},
		[],
	);

	const elementIsAtBottomOfView = useCallback(
		(element: Element, editorBottom: number, paddingBottom: number) => {
			return (
				element.getBoundingClientRect().bottom ===
				Math.ceil(editorBottom - paddingBottom)
			);
		},
		[],
	);

	const scrollElementIntoView = useCallback(
		(
			element: Element,
			block: ScrollLogicalPosition,
			offsetElement?: Element,
			topOffset?: number,
		) => {
			element.scrollIntoView({ behavior: "auto", block });

			if (topOffset && offsetElement) {
				offsetElement.scrollBy({ top: topOffset });
			}
		},
		[],
	);

	return {
		scrollToCursorIfNeeded,
		handleEnterScroll,
	};
};
