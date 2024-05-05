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
	override?: number
): Promise<void> => {
	let adjustedCurrentLineElement: HTMLDivElement | null = currentLineElement();
	
	if (override) {
		adjustedCurrentLineElement = document.querySelector(
			`[data-line-number="${override}"]`,
		);
	}

	if (!adjustedCurrentLineElement) {
		// Height setting fallback
		const theoreticalHeight = lineHeight * (override ?? 0);
		$astroWrapperInner().scrollBy({
			top: theoreticalHeight,
			behavior: "auto"
		})
		return;
	}

	const elementTop = Number.parseInt(adjustedCurrentLineElement.style.top.replace("top: ", "").replace("px", ""));
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

export const getDocumentHeight = (): number => {
	return document.documentElement.clientHeight;
};

export const getNumberOfLinesOnScreen = (): number => {
	return Math.floor(getDocumentHeight() / lineHeight);
};
