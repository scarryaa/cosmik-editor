import { listen } from "@tauri-apps/api/event";
import { readText } from "@tauri-apps/plugin-clipboard-manager";
import DOMPurify from "dompurify";
import { useEffect } from "react";

export function useListeners(
	editorRef: React.RefObject<HTMLDivElement>,
	setContent: React.Dispatch<React.SetStateAction<string>>,
) {
	useEffect(() => {
		const listenToEvents = () => {
			listen("copy", async () => {
				if (document.getSelection) {
					const selection = document.getSelection();
					const text = selection?.toString();

					try {
						if (text && selection) {
							await navigator.clipboard.writeText(text);
						} else if (text) {
							// If there is no selection, copy the whole line
                        }
					} catch (err) {
						console.error("Failed to copy text: ", err);
					}
				}
			});

			listen("cut", () => {
				if (document.getSelection) {
					const selection = document.getSelection();
					const text = selection?.toString();

					try {
						if (text && selection) {
							navigator.clipboard.writeText(text);
							selection?.deleteFromDocument();

							setContent(editorRef.current?.innerHTML?? "");
						} else if (text) {
							// If there is no selection, cut the whole line
						}
					} catch (err) {
						console.error("Failed to copy text: ", err);
					}
				}
			});

			listen("paste", async (e) => {
				const pastedData = await readText();
				const textToPaste = DOMPurify.sanitize(pastedData).split("\n");

				// Check if there is a selection
				const selection = document.getSelection?.();
				if (selection) {
					// Delete the selected text
					selection.deleteFromDocument();
				}

				const fragment = document.createDocumentFragment();

				// If editor is empty, delete the <br> and insert each line wrapped in a div
				if (editorIsEmpty()) {
					editorRef.current?.firstChild?.remove();
					for (const line of textToPaste) {
						if (line.trim().length === 0) {
							fragment.appendChild(createNewLineElement());
						} else {
							const div = document.createElement("div");
							div.textContent = line;
							fragment.appendChild(div);
						}
					}
				} else {
					// If editor is not empty, check if we are inside an empty div (only has <br>)
					if (
						(editorRef.current?.lastChild as HTMLElement).tagName === "DIV" &&
						currentlyOnEmptyLine()
					) {
						// If we are inside an empty div, remove it
						editorRef.current?.lastChild?.remove();

						// Insert each line wrapped in a div
						for (const line of textToPaste) {
							if (line.trim().length === 0) {
								fragment.appendChild(createNewLineElement());
							} else {
								const div = document.createElement("div");
								div.textContent = line;
								fragment.appendChild(div);
							}
						}
					} else {
						// If we are not inside an empty div, append the first line and insert the rest of the lines wrapped in a div
						if (editorRef.current?.lastChild) {
							editorRef.current.lastChild.textContent =
								editorRef.current.lastChild.textContent + textToPaste[0];
						}
						for (let i = 1; i < textToPaste.length; i++) {
							if (textToPaste[i].trim().length === 0) {
								fragment.appendChild(createNewLineElement());
							} else {
								const div = document.createElement("div");
								div.textContent = textToPaste[i];
								fragment.appendChild(div);
							}
						}
					}
				}

				// Insert the fragment into the editor
				insertContentIntoEditor(fragment);

				// Move the cursor after the inserted content
				moveCursorToEnd();

				// Update the editor's content state
				setContent(editorRef.current?.innerHTML || "");
			});

			listen("select-all", () => {
				document.execCommand("selectAll");
			});
		};

		return () => {
			listenToEvents();
		};
	}, [editorRef, setContent]);

	// Helpers
	const currentlyOnEmptyLine = () => {
		return (
			editorRef.current?.lastChild?.hasChildNodes?.() &&
			(editorRef.current?.lastChild.firstChild as HTMLElement).tagName === "BR"
		);
	};

	const editorIsEmpty = () => {
		return (
			editorRef.current?.innerHTML.trim() === "<br>" ||
			editorRef.current?.innerHTML.trim() === ""
		);
	};

	const createNewLineElement = () => {
		const div = document.createElement("div");
		div.innerHTML = "<br>";
		return div;
	};

	const insertContentIntoEditor = (content: Node) => {
		if (editorIsEmpty()) {
			editorRef.current?.firstChild?.remove();
		}
		editorRef.current?.appendChild(content);
	};

	const moveCursorToEnd = () => {
		const range = document.createRange();
		const sel = window.getSelection?.();
		const lastChild = editorRef.current?.lastChild;

		if (lastChild) {
			range.setStartAfter(lastChild);
			range.collapse(true);
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	};
}
