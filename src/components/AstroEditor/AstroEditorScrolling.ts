import { tick } from "svelte";
import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { measureTextWidth } from "../../util/text";

export const elementIsBelowEditorView = (
	element: HTMLElement,
	$astroWrapperInner: () => HTMLDivElement,
): boolean => {
	return element.clientTop > $astroWrapperInner().clientTop;
};

export const scrollToElement = (
	element: HTMLElement,
	block: ScrollLogicalPosition,
): void => {
	element.scrollIntoView({ behavior: "auto", block });
};

export const scrollToCurrentLine = async (
	currentLineElement: () => HTMLDivElement | null,
	$astroWrapperInner: () => HTMLDivElement,
	direction: "up" | "down",
	override?: number,
	attempt = 1, // Add an attempt parameter to keep track of retries
	maxAttempts = 5, // Maximum number of attempts before giving up
): Promise<void> => {
	await tick();
	let adjustedCurrentLineElement: HTMLDivElement | null = currentLineElement();

	if (override) {
		adjustedCurrentLineElement = document.querySelector(
			`[data-line-number="${override}"]`,
		);
	}

	// Retry mechanism if the element is not found and we haven't reached max attempts
	if (!adjustedCurrentLineElement && attempt <= maxAttempts) {
		setTimeout(() => {
			scrollToCurrentLine(
				currentLineElement,
				$astroWrapperInner,
				direction,
				override,
				attempt + 1,
				maxAttempts,
			);
		}, 100); // Retry after 100ms
		return;
	}

	if (!adjustedCurrentLineElement) return; // Give up after reaching max attempts

	const elementTop = adjustedCurrentLineElement.offsetTop;
	const visibleTop = $astroWrapperInner().scrollTop;
	const visibleBottom = visibleTop + $astroWrapperInner().clientHeight;
	const edgeThreshold = 50;

	// Determine if the current line is near the top or bottom edge
	const isNearTopEdge = elementTop < visibleTop + edgeThreshold;
	const isNearBottomEdge =
		elementTop + lineHeight > visibleBottom - edgeThreshold;

	// Scroll based on direction and whether the element is near an edge
	if (direction === "down" && isNearBottomEdge) {
		// Scroll down to bring the current line fully into view
		$astroWrapperInner().scrollBy({
			top: lineHeight + edgeThreshold - (visibleBottom - elementTop),
			behavior: "auto",
		});
	} else if (direction === "up" && isNearTopEdge) {
		// Scroll up to bring the current line fully into view
		$astroWrapperInner().scrollBy({
			top: -(visibleTop - elementTop + edgeThreshold),
			behavior: "auto",
		});
	}
};

export const scrollToCursor = (
	cursor: HTMLDivElement,
	$editor: () => Editor,
	$astroWrapperInner: () => HTMLDivElement,
): void => {
	const cursorPosition = $editor().getCursor().getPosition();
	const contentUpToCursor = $editor()
		.getContent()
		[cursorPosition.line].getContent()
		.substring(0, cursorPosition.character);
	const cursorLeft = measureTextWidth(contentUpToCursor);

	// Visible area calculation
	const visibleLeft = $astroWrapperInner().scrollLeft;
	const visibleRight = visibleLeft + $astroWrapperInner().clientWidth;

	// Edge padding
	const edgeThreshold = 50;

	// Determine if cursor is near the left or right edge
	const isNearLeftEdge = cursorLeft < visibleLeft + edgeThreshold;
	const isNearRightEdge = cursorLeft > visibleRight - edgeThreshold;

	// Adjust scroll if cursor is near either edge
	if (isNearLeftEdge) {
		$astroWrapperInner().scrollTo({
			left: cursorLeft - edgeThreshold,
			behavior: "auto",
		});
	} else if (isNearRightEdge) {
		$astroWrapperInner().scrollTo({
			left: cursorLeft - $astroWrapperInner().clientWidth + edgeThreshold,
			behavior: "auto",
		});
	}
};

export const getDocumentHeight = (): number => {
	return document.documentElement.clientHeight;
};

export const getNumberOfLinesOnScreen = (): number => {
	return Math.floor(getDocumentHeight() / lineHeight);
};
