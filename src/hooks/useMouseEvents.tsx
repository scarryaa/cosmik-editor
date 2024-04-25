import { useCallback, useEffect, useRef } from "react";
import type { EditorModel } from "../model/editorModel";
import { type Selection, SelectionDirection } from "../model/selectionModel";
import { debounce } from "../util/debounce";

type MouseClickPosition = {
	start: {
		line: number;
		character: number;
	};
	end?: {
		line: number;
		character: number;
	};
};

type MouseCoords = {
	x: number;
	y: number;
};

/**
 * A custom hook for managing mouse events within a text editor component.
 */
export const useMouseEvents = (
	editorModelRef: React.RefObject<EditorModel>,
	editorContainerRef: React.RefObject<HTMLDivElement>,
	isSelectingRef: React.MutableRefObject<boolean>,
	setIsSelecting: (selecting: boolean) => void,
	getDOMSelection: () => Selection,
	updateCursor: (
		model: EditorModel,
		opts: { line: number; char: number },
	) => void,
	selectionSourceRef: React.MutableRefObject<"keyboard" | "mouse" | null>,
) => {
	const textWidthCache = new Map<string, number>();
	const mouseClickPositon = useRef<MouseClickPosition>();
	const mouseClickCoords = useRef<MouseCoords>();

	const handleMouseDownWrapper = useCallback(
		(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
			handleMouseDown(event.nativeEvent),
		[],
	);

	const handleMouseDown = useCallback(
		(event: Event) => {
			const mouseEvent = event as MouseEvent;

			setIsSelecting(true);
			selectionSourceRef.current = "mouse";

			const target = mouseEvent.target as HTMLElement;
			const lineElement = target.closest("[data-line-number]");
			const model = editorModelRef.current;

			if (lineElement) {
				const mouseX = (event as MouseEvent).clientX;
				const mouseY = (event as MouseEvent).clientY;
				mouseClickCoords.current = {
					x: mouseX,
					y: mouseY,
				};

				const lineNumber = Number(
					lineElement.getAttribute("data-line-number") || "0",
				);

				const charPosition = calculateCharPosition(mouseEvent, lineElement);
				mouseClickPositon.current = {
					start: {
						character: charPosition,
						line: lineNumber,
					},
				};

				if (model) {
					model.getSelection().selectionBasis = charPosition;
				}

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
						char: model.getLineLength(model.getNumberOfLines()),
					});
				}
			}
		},
		[updateCursor, editorModelRef, setIsSelecting, selectionSourceRef],
	);

	const handleMouseMove = useCallback(
		(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const model = editorModelRef.current;

			if (!isSelectingRef.current || !model) return;
			selectionSourceRef.current = "mouse";

			const mouseY = event.clientY;
			const initialY = mouseClickCoords.current?.y ?? 0;

			// Determine the selection direction based on Y coordinates
			const selectionDirection =
				mouseY < initialY ? SelectionDirection.left : SelectionDirection.right;

			if (model) {
				model.updateSelection({
					...getDOMSelection(),
					direction: selectionDirection,
				});
			}
		},
		[editorModelRef, getDOMSelection, isSelectingRef, selectionSourceRef],
	);

	const debouncedMouseMove = debounce(
		(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			handleMouseMove(event);
		},
		1,
	);

	const handleMouseUp = useCallback(
		(event: Event) => {
			const model = editorModelRef.current;

			const target = event.target as HTMLElement;
			const lineElement = target.closest("[data-line-number]");

			const selectionDirection = determineSelectionDirection(lineElement);

			if (model && selectionDirection) {
				selectionSourceRef.current = "mouse";
				model.updateSelection({
					...getDOMSelection(),
					direction: selectionDirection,
				});
			}

			setIsSelecting(false);
			isSelectingRef.current = false;
		},
		[
			editorModelRef,
			getDOMSelection,
			selectionSourceRef,
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

	const determineSelectionDirection = (
		lineElement: Element | null,
	): SelectionDirection | null => {
		if (!lineElement) return null;

		let selectionDirection: SelectionDirection = SelectionDirection.right;
		if (lineElement) {
			const lineNumber = Number(
				lineElement.getAttribute("data-line-number") || "0",
			);

			const charPosition = calculateCharPosition(
				event as MouseEvent,
				lineElement,
			);
			mouseClickPositon.current = {
				start: {
					character: mouseClickPositon.current?.start.character ?? 0,
					line: mouseClickPositon.current?.start.line ?? 0,
				},
				end: {
					character: charPosition,
					line: lineNumber,
				},
			};

			// Determine selection direction
			if (mouseClickPositon.current?.start && mouseClickPositon.current?.end) {
				const isForward =
					mouseClickPositon.current.end.line >
						mouseClickPositon.current.start.line ||
					(mouseClickPositon.current.end.line ===
						mouseClickPositon.current.start.line &&
						mouseClickPositon.current.end.character >=
							mouseClickPositon.current.start.character);

				selectionDirection = isForward
					? SelectionDirection.right
					: SelectionDirection.left;
			}
		}

		return selectionDirection;
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
			document[method]("mouseup", handleMouseUp);
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
