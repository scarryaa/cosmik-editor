import { tick } from "svelte";
import type { Writable } from "svelte/store";
import type { Editor } from "../models/Editor";
import { textWidthCache } from "./consts";

export let lastCursorPosition: number;

export const updateLastCursorPosition = (lastPosition: number) => {
    lastCursorPosition = lastPosition;
}

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

	const lineText = lineElement.textContent || "";
	const fontStyling = window.getComputedStyle(lineElement).font;

	let closestCharIndex = 0;
	let smallestDifference = Number.POSITIVE_INFINITY;

	for (let i = 0; i <= lineText.length; i++) {
		const textUpToChar = lineText.slice(0, i);
		const measuredWidth = measureTextWidth(textUpToChar, fontStyling);

		const difference = Math.abs(clickPositionRelativeToLine - measuredWidth);
		if (difference < smallestDifference) {
			smallestDifference = difference;
			closestCharIndex = i;
		} else {
			break;
		}
	}

	return closestCharIndex;
};

export const placeCursorAtPosition = async (lineNumber: number, editorElement: HTMLDivElement, charIndex = 0) => {
	const targetLineElement = editorElement.querySelector(
		`[data-line-number="${lineNumber}"]`,
	);
	if (targetLineElement) {
		// Attempt to find a text node within the target line element
		let targetNode = Array.from(targetLineElement.childNodes).find(
			(node) => node.nodeType === Node.TEXT_NODE,
		);
		let adjustedCharIndex = charIndex;
		const range = document.createRange();
		const selection = window.getSelection();

		await tick();
		if (targetNode) {
			// If a text node is found, adjust the char index to not exceed the node's length
			adjustedCharIndex = Math.min(
				adjustedCharIndex,
				targetNode.textContent?.length ?? 0,
			);
			range.setStart(targetNode, adjustedCharIndex);
		} else {
			// If no text node is found, default to the start of the target line element
			range.setStart(targetLineElement, 0);
		}

		range.collapse(true); // Collapse the range to the start, making it a single point
		selection?.removeAllRanges();
		selection?.addRange(range);
	}
};

export const resetEditorContent = (editorElement: HTMLDivElement, editorModel: Writable<Editor>) => {
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