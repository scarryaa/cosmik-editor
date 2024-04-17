import DOMPurify from "dompurify";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

/**
 * A custom hook to manage the editor's content and cursor position.
 */
export function useEditor(
	editorRef: React.RefObject<HTMLDivElement>,
	setLineCount: React.Dispatch<React.SetStateAction<number>>,
	calculateLineCount: (htmlContent: string) => number,
	lineCount: number,
	initialContent = "",
) {
	const lastContentRef = useRef<string>(initialContent);
	const [content, setContent] = useState<string>(initialContent);
	const [cursorPosition, setCursorPosition] = useState<number | null>(null);

	const sanitizeContent = (content: string) => {
		return DOMPurify.sanitize(content);
	};

	const replaceEntireContent = (newContent: string) => {
		const sanitizedContent = sanitizeContent(newContent);
		setContent(sanitizedContent);
		lastContentRef.current = sanitizedContent;
	};

	const insertContentAtCursor = (newContent: string) => {
		const selection = document.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			const sanitizedContent = sanitizeContent(newContent);
			range.deleteContents(); // Delete the current selection

			if (sanitizedContent.includes("\n")) {
				handleMultiLineInsertion(sanitizedContent, range);
			} else {
				const lineNode = document.createTextNode(sanitizedContent);
				range.insertNode(lineNode);
			}

			// Move the cursor after the inserted content
			range.collapse(true);
			selection.removeAllRanges();
			selection.addRange(range);

			// Update the editor's content state
			updateContent(editorRef.current?.innerHTML || "");
		}
	};

	const sanitizeDiffAndUpdateContent = useCallback(
		(newContent: string, insertAtCursor = true) => {
			if (!insertAtCursor) {
				replaceEntireContent(newContent);
			} else {
				insertContentAtCursor(newContent);
			}
		},
		[replaceEntireContent, insertContentAtCursor],
	);

	const updateContent = useCallback((newContent: string) => {
		setContent(newContent);
		lastContentRef.current = newContent;
	}, []);

	const updateCursorPosition = useCallback((position: number) => {
		setCursorPosition(position);
		// Additional logic to ensure the cursor is correctly positioned
	}, []);

	const handleMultiLineInsertion = (sanitizedContent: string, range: Range) => {
		const lines = sanitizedContent.split("\n");
		const fragment = document.createDocumentFragment();
		lines.forEach((line, index) => {
			if (index > 0) {
				fragment.appendChild(document.createElement("br")); // Add a line break for each new line, except the first
			}
			const lineNode = document.createTextNode(line);
			fragment.appendChild(lineNode);
		});
		range.insertNode(fragment);
	};

	const handlePaste = useCallback(
		(e: React.FormEvent<HTMLDivElement>) => {
			e.preventDefault(); // Prevent the default paste behavior
			const pastedText = (
				e as unknown as ClipboardEvent
			).clipboardData?.getData("text/plain");
			if (pastedText) {
				const sanitizedContent = sanitizeContent(pastedText); // Sanitize the pasted content

				// Check if the last element is a <br> tag
				const lastElement =
					editorRef.current?.childNodes[
						editorRef.current?.childNodes.length - 1
					];
				if (lastElement?.nodeName === "BR") {
					// Remove the last <br> tag
					editorRef.current?.removeChild(lastElement);
					// Insert the sanitized content at the cursor's position
					insertContentAtCursor(sanitizedContent);
				} else {
					// If the last element is not a <br>, insert at the cursor position
					insertContentAtCursor(sanitizedContent);
				}

				setLineCount(calculateLineCount(editorRef.current?.innerHTML || ""));
			}
		},
		[
			sanitizeContent,
			insertContentAtCursor,
			calculateLineCount,
			editorRef,
			setLineCount,
		],
	);

    const handleInput = useCallback(
		(e: React.FormEvent<HTMLDivElement>) => {
			const newContent = e.currentTarget.innerHTML;
			sanitizeDiffAndUpdateContent(newContent, false);

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

	useLayoutEffect(() => {
		const newLineCount = calculateLineCount(content);
		if (newLineCount !== lineCount) {
			setLineCount(newLineCount);
		}

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
	}, [content, lineCount, calculateLineCount, editorRef, setLineCount]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key === "Enter") {
				e.preventDefault(); // Prevent the default div creation on enter
				document.execCommand("insertHTML", false, "<br><br>"); // Insert a double BR for a new line.

				// Update content state to reflect the new structure
				const updatedContent = editorRef.current?.innerHTML || "";
				updateContent(updatedContent);
				lastContentRef.current = updatedContent;
			}
		},
		[editorRef, updateContent],
	);

	return {
		content,
		updateContent,
		cursorPosition,
		updateCursorPosition,
		lastContentRef,
		sanitizeDiffAndUpdateContent,
		handlePaste,
		handleMultiLineInsertion,
		sanitizeContent,
		insertContentAtCursor,
        handleInput,
        handleKeyDown,
	};
}
