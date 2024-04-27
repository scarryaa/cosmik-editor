import type { Editor } from "../models/Editor";
import { LINE_HEIGHT, SCROLL_HORIZ_OFFSET, SCROLL_OFFSET } from "./consts";
import { lastCursorPosition, updateLastCursorPosition } from "./editorUtils";

export enum ScrollDirection {
	Left = "left",
	Right = "right",
	Up = "up",
	Down = "down",
	Unknown = "unknown",
}

export const elementIsBelowView = (element: Element, paddingBottom: number) => {
	return element.getBoundingClientRect().bottom > paddingBottom;
};

export const elementIsAboveView = (element: Element) => {
	return (
		element.getBoundingClientRect().bottom < SCROLL_OFFSET + LINE_HEIGHT / 2
	);
};

const elementIsAtBottomOfView = (
	element: Element,
	editorBottom: number,
	paddingBottom: number,
) => {
	return (
		element.getBoundingClientRect().bottom ===
		Math.ceil(editorBottom - paddingBottom)
	);
};

export const scrollElementIntoView = (
	element: Element,
	block: ScrollLogicalPosition,
	offsetElement?: Element,
	topOffset?: number,
) => {
	element.scrollIntoView({ behavior: "auto", block });

	if (topOffset && offsetElement) {
		offsetElement.scrollBy({ top: topOffset });
	}
};

export const scrollToCursorIfNeeded = (
	direction: ScrollDirection,
	$editorModel: Editor,
	app: HTMLElement | null,
	editorElement: HTMLDivElement,
	editorWrapper: HTMLDivElement | null,
) => {
	const model = $editorModel;
	const cursorPosition = model.cursor.position;
	// Hack to fix Enter scroll on last line not working
	const lineElement = document.querySelector(
		`[data-line-number="${
			cursorPosition.cursorLine === model.getNumberOfLines() + 1
				? cursorPosition.cursorLine - 1
				: cursorPosition.cursorLine
		}"]`,
	);
	const cursorElement = document.querySelector(".cursor");

	if (
		!cursorPosition ||
		!lineElement ||
		!app ||
		!cursorElement ||
		!editorWrapper
	)
		return;

	const contentStyle = window.getComputedStyle(editorElement);
	const paddingBottom = Number(contentStyle.paddingBottom.replace("px", ""));

	handleHorizontalScroll(cursorElement, lineElement, editorElement);
	handleVerticalScroll(
		direction,
		lineElement,
		editorElement,
		$editorModel,
		paddingBottom,
		app,
		model,
	);
};

export const handleHorizontalScroll = (
	cursorElement: Element,
	lineElement: Element,
	editorElement: HTMLDivElement,
) => {
	const cursorLeftEdge = cursorElement.getBoundingClientRect().left;
	const editorLeftEdge = editorElement.getBoundingClientRect().left;
	const cursorRightEdge = cursorElement.getBoundingClientRect().right;
	const editorRightEdge = editorElement.getBoundingClientRect().right;

	if (cursorRightEdge + SCROLL_HORIZ_OFFSET > editorRightEdge) {
		editorElement.scrollBy({
			left: cursorRightEdge - editorRightEdge + SCROLL_HORIZ_OFFSET,
		});
	}

	if (cursorLeftEdge < editorLeftEdge + SCROLL_HORIZ_OFFSET) {
		editorElement.scrollBy({
			left: -(editorLeftEdge - cursorLeftEdge + SCROLL_HORIZ_OFFSET),
		});
	}

	if (lineElement.lastChild?.nodeName === "BR") {
		editorElement.scrollBy({
			left: -editorElement.scrollWidth, // Scroll back to the start
		});
	}
};

export const handleVerticalScroll = (
	direction: ScrollDirection,
	lineElement: Element,
	editorElement: Element,
	editorModel: Editor,
	paddingBottom: number,
	app: HTMLElement | null,
	model: Editor,
) => {
	if (!app) return;
	const editorBottom = editorElement.getBoundingClientRect().bottom;

	if (direction === ScrollDirection.Up && elementIsAboveView(lineElement)) {
		scrollElementIntoView(lineElement, "start", app, -SCROLL_OFFSET);
	} else if (
		direction === ScrollDirection.Down &&
		(elementIsBelowView(lineElement, paddingBottom) ||
			elementIsAtBottomOfView(lineElement, editorBottom, paddingBottom) ||
			editorModel.cursor.position.cursorLine === editorModel.getNumberOfLines())
	) {
		scrollElementIntoView(lineElement, "end", app, LINE_HEIGHT * 2);
	}

	// Check for vertical movement on horizontal navigation
	if (
		(direction === ScrollDirection.Left ||
			direction === ScrollDirection.Right) &&
		model.cursor.position.cursorLine !== lastCursorPosition &&
		// Hacky method
		lastCursorPosition !== 1 &&
		lastCursorPosition !== 2 &&
		lastCursorPosition !== 3 &&
		lastCursorPosition !== 4
	) {
		if (elementIsAboveView(lineElement)) {
			scrollElementIntoView(lineElement, "start", app, -SCROLL_OFFSET);
		} else if (elementIsBelowView(lineElement, paddingBottom)) {
			scrollElementIntoView(lineElement, "end", app, LINE_HEIGHT);
		}
	}

	// Update `lastCursorPosition` with the current line number after performing checks
	updateLastCursorPosition(model.cursor.position.cursorLine);
};
