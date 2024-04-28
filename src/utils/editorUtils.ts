import { tick } from "svelte";
import type { Writable } from "svelte/store";
import type { CursorPosition } from "../models/Cursor";
import type { Editor } from "../models/Editor";
import { textWidthCache } from "./consts";

export let lastCursorPosition: number;

export const updateLastCursorPosition = (lastPosition: number) => {
	lastCursorPosition = lastPosition;
};

export const measureTextWidth = (text: string, font: string): number => {
	const cacheKey = `${font}-${text}`;
	if (textWidthCache.has(cacheKey)) {
		// biome-ignore lint/style/noNonNullAssertion: We check if it has the key
		return textWidthCache.get(cacheKey)!;
	}

	// Create a temporary span element
	const element = document.createElement("span");
	element.textContent = text;
	element.style.font = font;
	element.style.whiteSpace = "pre";
	element.style.visibility = "hidden";
	document.body.appendChild(element);
	const width = element.offsetWidth;
	document.body.removeChild(element);

	// Cache the measured width
	textWidthCache.set(cacheKey, width);
	return width;
};

export const calculateCharIndex = (
    event: MouseEvent,
    lineElement: HTMLElement,
): number => {
    const clickX = event.clientX;
    const lineStartX = lineElement.getBoundingClientRect().left;
    const clickPositionRelativeToLine = clickX - lineStartX;

    let cumulativeWidth = 0;
    let cumulativeCharIndex = 0; // Accumulate character index across all child elements
    let found = false;
    let closestCharIndex = 0;
    let smallestDifference = Number.POSITIVE_INFINITY;

    const childElements = lineElement.childNodes; // Get all child nodes, including text and elements
    for (const child of childElements) {
        const childText = child.nodeType === Node.TEXT_NODE ? child.textContent : (child as HTMLElement).innerText;
        const fontStyling = window.getComputedStyle(child.nodeType === Node.TEXT_NODE ? lineElement : child as HTMLElement).font;

		if (!childText) return 0;

        for (let i = 0; i <= childText.length; i++) {
            const textUpToChar = childText.slice(0, i);
            const measuredWidth = measureTextWidth(textUpToChar, fontStyling);
            const totalMeasuredWidth = cumulativeWidth + measuredWidth;

            const difference = Math.abs(clickPositionRelativeToLine - totalMeasuredWidth);
            if (difference < smallestDifference) {
                smallestDifference = difference;
                closestCharIndex = cumulativeCharIndex + i;
                found = true;
            } else {
                // Once the difference starts increasing, stop checking further characters in this child
                break;
            }
        }

        if (found) {
            // If the closest character index was found in this child, no need to check further children
            break;
        }

        // Update cumulative width and character index before moving to the next child
        cumulativeWidth += measureTextWidth(childText, fontStyling);
        cumulativeCharIndex += childText.length;
    }

    return closestCharIndex;
};

export const placeCursorAtPosition = async (
	lineNumber: number,
	editorElement: HTMLDivElement,
	charIndex = 0,
) => {
	const targetLineElement = editorElement.querySelector(
		`[data-line-number="${lineNumber}"]`,
	);
	if (targetLineElement) {
		await tick();

		let cumulativeLength = 0;
		let targetNode = null;
		let adjustedCharIndex = 0;

		// Function to recursively search for the target node
		const searchNodes = (nodes: NodeList) => {
			for (const node of nodes) {
				if (node.nodeType === Node.TEXT_NODE) {
					const nodeTextLength = node.textContent?.length || 0;
					if (cumulativeLength + nodeTextLength >= charIndex) {
						targetNode = node;
						adjustedCharIndex = charIndex - cumulativeLength;
						return true; // Stop searching
					}
					cumulativeLength += nodeTextLength;
				} else if (node.nodeType === Node.ELEMENT_NODE) {
					// If it's an element, search its child nodes
					const childNodesFound = searchNodes(node.childNodes);
					if (childNodesFound) return true; // Stop searching if target node is found within children
				}
			}
			return false; // Continue searching
		};

		// Start searching from the target line element's child nodes
		searchNodes(targetLineElement.childNodes);

		const range = document.createRange();
		const selection = window.getSelection();

		if (targetNode) {
			if ((targetNode as HTMLElement).nodeType === Node.TEXT_NODE) {
				range.setStart(targetNode, adjustedCharIndex);
			} else {
				// This case should not occur
				range.setStart(targetNode, 0);
			}
			range.collapse(true); // Collapse the range to the start point
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}
};

export const resetEditorContent = (
	editorElement: HTMLDivElement,
	editorModel: Writable<Editor>,
) => {
	if (editorElement.innerHTML.trim() === "") {
		editorModel.update((model) => {
			model.resetContent();
			return model;
		});

		placeCursorInDiv(editorElement.firstChild as HTMLDivElement);
	}
};

export const placeCursorInDiv = (divElement: HTMLDivElement) => {
	const range = document.createRange();
	const selection = window.getSelection();
	range.setStart(divElement, 0);

	// Collapse the range to the start, making it a single point
	range.collapse(true);
	selection?.removeAllRanges();
	selection?.addRange(range);
};

export const findPreviousWordOrSymbol = (
	lines: { number: number; content: string }[],
	cursorPosition: CursorPosition,
): CursorPosition => {
	let currentIndex = cursorPosition.cursorCharacter - 1;
	let currentLine = cursorPosition.cursorLine - 1;
	let foundNonWord = false;
	let foundWord = false;

	while (currentLine >= 0) {
		const line = lines[currentLine].content;
		while (currentIndex >= 0) {
			const char = line[currentIndex];
			const isWordChar = /\w/.test(char);

			if (!foundWord && isWordChar) {
				foundWord = true;
			} else if (foundWord && !isWordChar) {
				// Found the non-word character before the word, stop here
				foundNonWord = true;
				break;
			}

			// Stop if we've found the non-word character before the word
			if (foundNonWord) break;
			currentIndex--;
		}

		if (foundNonWord || (foundWord && currentIndex < 0)) {
			// If we found the beginning of the word or reached the start of the line
			return {
				cursorLine: currentLine + 1,
				cursorCharacter: currentIndex + 1,
				cursorBasis: currentIndex + 1,
			};
		}

		if (currentIndex < 0) {
			// If we've reached the start of the line, stop at the start of this line
			return {
				cursorLine: currentLine + 1,
				cursorCharacter: 0,
				cursorBasis: 0,
			};
		}
	}

	// Default case: move to the very start if no previous word is found
	return {
		cursorLine: cursorPosition.cursorLine,
		cursorCharacter: 0,
		cursorBasis: 0,
	};
};

export const findNextWordOrSymbol = (
	lines: { number: number; content: string }[],
	cursorPosition: CursorPosition,
): CursorPosition => {
	let currentIndex = cursorPosition.cursorCharacter;
	let currentLine = cursorPosition.cursorLine - 1;
	let inNonWordSequence = false;
	let foundWordStart = false;

	while (currentLine < lines.length) {
		const line = lines[currentLine].content;
		while (currentIndex < line.length) {
			const char = line[currentIndex];
			if (!/\w/.test(char)) {
				inNonWordSequence = true;
			} else if (inNonWordSequence || !foundWordStart) {
				foundWordStart = true;
				inNonWordSequence = false;
				if (currentIndex > cursorPosition.cursorCharacter) {
					return {
						cursorLine: currentLine + 1,
						cursorCharacter: currentIndex,
						cursorBasis: cursorPosition.cursorBasis,
					};
				}
			}
			currentIndex++;
		}
		// If the end of the line content is reached without finding a new word start,
		// return the cursor position at the end of this line
		return {
			cursorLine: currentLine + 1,
			cursorCharacter: line.length,
			cursorBasis: cursorPosition.cursorBasis,
		};
	}

	// If no suitable position is found in the remaining text, return the cursor to the end of the last line
	const lastLineIndex = lines.length - 1;
	return {
		cursorLine: lastLineIndex + 1,
		cursorCharacter: lines[lastLineIndex].content.length,
		cursorBasis: cursorPosition.cursorBasis,
	};
};
