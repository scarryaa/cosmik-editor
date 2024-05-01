import { font } from "../const/const";
import type { CursorPosition } from "../models/Cursor";
import type { Editor } from "../models/Editor";
import type { Line } from "../models/Line";

const textWidthCache = new Map<string, number>();

export const findPreviousWordOrSymbol = (
	lines: Line[],
	cursorPosition: CursorPosition,
): CursorPosition => {
	let currentIndex = cursorPosition.character - 1;
	let currentLine = cursorPosition.line;
	let foundNonWord = false;
	let foundWord = false;

	while (currentLine >= 0) {
		const line = lines[currentLine].getContent();
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
				line: currentLine,
				character: currentIndex + 1,
				characterBasis: currentIndex + 1,
			};
		}

		if (currentIndex < 0) {
			// If we've reached the start of the line, stop at the start of this line
			return {
				line: currentLine,
				character: 0,
				characterBasis: 0,
			};
		}
	}

	// Default case: move to the very start if no previous word is found
	return {
		line: cursorPosition.line,
		character: 0,
		characterBasis: 0,
	};
};

export const findNextWordOrSymbol = (
	lines: Line[],
	cursorPosition: CursorPosition,
): CursorPosition => {
	let currentIndex = cursorPosition.character;
	let currentLine = cursorPosition.line;
	let inNonWordSequence = false;
	let foundWordStart = false;

	while (currentLine < lines.length) {
		const line = lines[currentLine].getContent();
		while (currentIndex < line.length) {
			const char = line[currentIndex];
			if (!/\w/.test(char)) {
				inNonWordSequence = true;
			} else if (inNonWordSequence || !foundWordStart) {
				foundWordStart = true;
				inNonWordSequence = false;
				if (currentIndex > cursorPosition.character) {
					return {
						line: currentLine,
						character: currentIndex,
						characterBasis: cursorPosition.characterBasis,
					};
				}
			}
			currentIndex++;
		}
		// If the end of the line content is reached without finding a new word start,
		// return the cursor position at the end of this line
		return {
			line: currentLine,
			character: line.length,
			characterBasis: cursorPosition.characterBasis,
		};
	}

	// If no suitable position is found in the remaining text, return the cursor to the end of the last line
	const lastLineIndex = lines.length - 1;
	return {
		line: lastLineIndex + 1,
		character: lines[lastLineIndex].getContent().length,
		characterBasis: cursorPosition.characterBasis,
	};
};

export const measureTextWidth = (content: string): number => {
	// Check if the content's width is already cached
	if (textWidthCache.has(content)) {
		// biome-ignore lint/style/noNonNullAssertion: We already check above
		return textWidthCache.get(content)!;
	}

	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	if (!context) return 0;

	context.font = font;
	const metrics = context.measureText(content);
	const width = metrics.width;

	textWidthCache.set(content, width);

	return width;
};

export const getCharacterIndex = (
	event: MouseEvent,
	$editor: Editor,
): number => {
	const target = event.target as HTMLElement;
	const { left } = target.getBoundingClientRect();
	const clickX = event.clientX - left;

	let cumulativeWidth = 0;
	const line = getLineIndex(event, $editor.getTotalLines());
	const content = $editor.getContent()[line - 1].getContent();
	let characterIndex = content.length;

	for (let i = 0; i < content.length; i++) {
		const charWidth = measureTextWidth(content[i]);
		cumulativeWidth += charWidth;
		if (cumulativeWidth >= clickX) {
			characterIndex = i;
			break;
		}
	}

	// Removed redundant console.log for cleaner code
	return characterIndex;
};

export const getLineIndex = (event: MouseEvent, totalLines: number): number => {
	const target = event.target as HTMLElement;
	const lineNumber =
		target.dataset.lineNumber ?? target.parentElement?.dataset.lineNumber;
	return lineNumber ? Number.parseInt(lineNumber, 10) : totalLines;
};
