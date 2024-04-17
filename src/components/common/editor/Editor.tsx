import DOMPurify from "dompurify";
import type React from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./Editor.scss";
import { LineNumbers } from "./LineNumbers";

export const Editor = () => {
	const lastContentRef = useRef<string>("");
	const [content, setContent] = useState("");
	const editorRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (editorRef.current && content.length > 0) {
			const restoreCursor = () => {
				const range = document.createRange();
				const sel = window.getSelection?.();

				if (editorRef.current && editorRef.current.childNodes.length > 0) {
					const node =
						editorRef.current.childNodes[
							editorRef.current.childNodes.length - 1
						];
					range.setStartAfter(node);
					range.collapse(true);
					sel?.removeAllRanges();
					sel?.addRange(range);
				}
			};
			restoreCursor();
		}
	}, [content]);

	const sanitizeDiffAndUpdateContent = useCallback((newContent: string) => {
		const lastContent = lastContentRef.current;
		let diff = "";

		// Basic diff logic: find the first index where they differ
		let i = 0;
		while (
			i < newContent.length &&
			i < lastContent.length &&
			newContent[i] === lastContent[i]
		) {
			i++;
		}

		diff = newContent.substring(i);
		const sanitizedDiff = DOMPurify.sanitize(diff);

		// Replace the diff in the new content with the sanitized version
		const updatedContent = newContent.substring(0, i) + sanitizedDiff;

		// Update the state and the last content reference
		setContent(updatedContent);
		lastContentRef.current = updatedContent;
	}, []);

	const handleInput = useCallback(
		(e: React.FormEvent<HTMLDivElement>) => {
			const newContent = e.currentTarget.innerHTML;
			sanitizeDiffAndUpdateContent(newContent);

			const selection = window.getSelection?.();

			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const preCaretRange = range.cloneRange();
				preCaretRange.selectNodeContents(e.currentTarget);
				preCaretRange.setEnd(range.endContainer, range.endOffset);
			}
		},
		[sanitizeDiffAndUpdateContent],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
		},
		[],
	);

	const calculateLineCount = (htmlContent: string): number => {
		// Create a temporary div element
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = htmlContent;

		let lineCount = 0;

		// Function to recursively count lines
		const countLines = (node: HTMLElement) => {
			// Count each child node
			for (let i = 0; i < node.childNodes.length; i++) {
				const child = node.childNodes[i];

				if (child.nodeType === Node.ELEMENT_NODE) {
					// If the child is a block element, increment line count
					const childElement = child as HTMLElement;
					if (["BR"].includes(childElement.tagName)) {
						lineCount++;
					}
					// Recursively count for nested elements
					countLines(childElement);
				} else if (child.nodeType === Node.TEXT_NODE) {
					// Increment line count for non-empty text nodes
					if (child.textContent?.trim()) {
						lineCount++;
					}
				}
			}
		};

		countLines(tempDiv);

		return lineCount;
	};

	const lineCount = calculateLineCount(content);

	return (
		<div className="editor-wrapper">
			<LineNumbers lineCount={lineCount} />
			<div
				ref={editorRef}
				contentEditable={true}
				onInput={handleInput}
				onKeyDown={handleKeyDown}
				className="editor"
				suppressContentEditableWarning={true}
				role="textbox"
				aria-multiline="true"
				tabIndex={0}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
};
