import { useCallback, useEffect } from "react";
import type { EditorModel } from "../model/editorModel";
import type { Selection } from "../model/selectionModel";
import { debounce } from "../util/debounce";

/**
 * A custom hook for managing mouse events within a text editor component.
 */
export const useMouseEvents = (
	editorModelRef: React.RefObject<EditorModel>,
	editorContainerRef: React.RefObject<HTMLDivElement>,
	isSelectingRef: React.MutableRefObject<boolean>,
	setIsSelecting: (selecting: boolean) => void,
	updateSelection: (model: EditorModel, newSelection: Selection) => void,
	getDOMSelection: () => Selection,
	updateCursor: (
		model: EditorModel,
		opts: { line: number; char: number },
	) => void,
) => {
	const textWidthCache = new Map<string, number>();

	const handleMouseDownWrapper = useCallback(
		(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
			handleMouseDown(event.nativeEvent),
		[],
	);

	const handleMouseDown = useCallback(
		(event: Event) => {
			const mouseEvent = event as MouseEvent;

			setIsSelecting(true);

			const target = mouseEvent.target as HTMLElement;
			const lineElement = target.closest("[data-line-number]");
			const model = editorModelRef.current;

			if (lineElement) {
				const lineNumber = Number(
					lineElement.getAttribute("data-line-number") || "0",
				);

				const charPosition = calculateCharPosition(mouseEvent, lineElement);
				if (model) {
					updateCursor(model, {
						line: lineNumber,
						char: charPosition,
					});
				}
			} else {
				// If there is no line, just set the cursor to the end of the last line
				if (model) {
					updateCursor(model, {
						line: model.getNumberOfLines(),
						char: model.getCurrentLineLength(),
					});
				}
			}
		},
		[updateCursor, editorModelRef, setIsSelecting],
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			const model = editorModelRef.current;

			if (!isSelectingRef.current || !model) return;

			updateSelection(model, getDOMSelection());
		},
		[editorModelRef, updateSelection, getDOMSelection, isSelectingRef],
	);

	const debouncedMouseMove = debounce(
		(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			handleMouseMove(event.nativeEvent);
		},
		1,
	);

	const handleMouseUp = useCallback(
		(event: Event) => {
			const model = editorModelRef.current;

			if (model) {
				updateSelection(model, getDOMSelection());
			}

			setIsSelecting(false);
			isSelectingRef.current = false;
		},
		[
			editorModelRef,
			updateSelection,
			getDOMSelection,
			setIsSelecting,
			isSelectingRef,
		],
	);

	const calculateCharPosition = (
		event: MouseEvent,
		lineElement: Element,
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

	const measureTextWidth = (text: string, font: string): number => {
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

	// DOM Listeners
	useEffect(() => {
		const container = editorContainerRef.current;
		if (!container) return;

		// Helper function to toggle event listeners
		const toggleListeners = (action: "add" | "remove") => {
			const method =
				action === "add" ? "addEventListener" : "removeEventListener";
			container[method]("mouseup", handleMouseUp);
			container[method]("mousedown", handleMouseDown);
			// Need this on the document so selection outside of the window works correctly
			document[method]("mousemove", debouncedMouseMove);
		};

		// Add event listeners
		toggleListeners("add");

		return () => {
			// Remove event listeners on cleanup
			toggleListeners("remove");
		};
	}, [handleMouseUp, debouncedMouseMove, handleMouseDown, editorContainerRef]);

	return {
		handleMouseDownWrapper,
		debouncedMouseMove,
		handleMouseUp,
	};
};
