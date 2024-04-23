import { useCallback, useEffect, useRef, useState } from "react";
import type { EditorModel } from "../model/editorModel";
import { Selection, SelectionEvents } from "../model/selectionModel";

/**TODO
 * implement selections for up and down
 * fix mouse selections
 * synch up mouse and keyboard selections
 * add bounds checking for selections
 * clear selection (truly clear) on click or non shift keystroke
 */

/**
 * A custom hook for managing selections within a text editor component.
 */
export const useSelectionManagement = (
	editorModelRef: React.RefObject<EditorModel>,
	editorContainerRef: React.RefObject<HTMLDivElement>,
) => {
	const isSelectingRef = useRef(false);
	const [selection, setSelection] = useState<Selection>(Selection.empty());

	// Function to update the selection in state and model
	const updateSelection = useCallback(
		(model: EditorModel, newSelection: Selection) => {
			setSelection((oldSelection) =>
				{
					if (oldSelection === newSelection) {
						return oldSelection;
                    }

					return new Selection(
						newSelection.content,
						newSelection.startLine,
						newSelection.endLine,
						newSelection.startIndex,
						newSelection.endIndex,
						newSelection.direction,
					);
				}
			);
			model.getSelection().emit(SelectionEvents.selectionChanged, newSelection);
		},
		[],
	);

	const applyDOMSelection = (selection: Selection) => {
		const editor = editorContainerRef.current;
		const _selection = document.getSelection();

		if (!_selection || !editor) return;

		const range = document.createRange();

		const startNode = findTextNode(editor, selection.startLine);
		const endNode = findTextNode(editor, selection.endLine);
		if (!startNode || !endNode) return;

		const startOffset = findCharacterOffset(startNode, selection.startIndex);
		const endOffset = findCharacterOffset(endNode, selection.endIndex);

		range.setStart(startNode, startOffset);
		range.setEnd(endNode, endOffset);

		// requestAnimationFrame is needed or else the visible
		// selection disappears due to React re-renders
		requestAnimationFrame(() => {
			_selection.removeAllRanges();
			_selection.addRange(range);
		});
	};

	const findTextNode = (
		editor: HTMLDivElement,
		line: number,
	): ChildNode | null => {
		const lineElement = editor.querySelector(`div[data-line-number="${line}"]`);
		if (!lineElement) return null;

		return lineElement.firstChild;
	};

	const findCharacterOffset = (node: ChildNode, offset: number): number => {
		return offset;
	};

	const clearSelection = useCallback(() => {
		const model = editorModelRef.current;
		if (!model) return;

		updateSelection(model, Selection.empty());
	}, [editorModelRef, updateSelection]);

	// Helpers
	const setIsSelecting = (selecting: boolean) => {
		isSelectingRef.current = selecting;
	};

	const getDOMSelection = () => {
		const selection = document.getSelection();

		let newSelection: Selection = Selection.empty();
		let range: Range | undefined;

		try {
			range = selection?.getRangeAt(0);
		} catch (error: unknown) {
			// Ignore IndexSizeError
			if ((error as Error).name !== "IndexSizeError") {
				console.error(error);
			}
		}

		if (range) {
			newSelection = createSelectionFromRange(range);
		}

		return newSelection;
	};

	const createSelectionFromRange = (range: Range): Selection => {
		const startContainer = range.startContainer.parentNode as HTMLElement;
		const endContainer = range.endContainer.parentNode as HTMLElement;

		const startLineElement = startContainer.closest("[data-line-number]");
		const endLineElement = endContainer.closest("[data-line-number]");

		if (!startLineElement || !endLineElement) return Selection.empty();

		const startLine = Number(
			startLineElement.getAttribute("data-line-number") || "0",
		);
		const endLine = Number(
			endLineElement.getAttribute("data-line-number") || "0",
		);

		return new Selection(
			range.toString(),
			startLine,
			endLine,
			range.startOffset,
			range.endOffset,
		);
	};

	// Model event listeners
	useEffect(() => {
		const model = editorModelRef.current;
		if (!model) return;

		const handleSelectionChange = (newSelection: Selection) => {
			setSelection((oldSelection) => {
				if (oldSelection === newSelection) {
					return oldSelection;
				}

				return new Selection(
					newSelection.content,
					newSelection.startLine,
					newSelection.endLine,
					newSelection.startIndex,
					newSelection.endIndex,
					newSelection.direction,
				);
			});
			applyDOMSelection(newSelection);
		};

		model.on(SelectionEvents.selectionChanged, handleSelectionChange);

		return () => {
			model.off(SelectionEvents.selectionChanged, handleSelectionChange);
		};
	}, [editorModelRef, applyDOMSelection]);

	// DOM Listeners
	useEffect(() => {
		const handleSelectDelegated = (event: Event) => {
			const model = editorModelRef.current;

			if (!isSelectingRef.current || !model) {
				return;
			}

			const selection = document.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const newSelection = createSelectionFromRange(range);
				updateSelection(model, newSelection);
			}
		};

		const container = editorContainerRef.current;
		if (container) {
			container.addEventListener("selectstart", handleSelectDelegated);
		}

		return () => {
			if (container) {
				container.removeEventListener("selectstart", handleSelectDelegated);
			}
		};
	}, [
		editorContainerRef,
		editorModelRef,
		updateSelection,
		createSelectionFromRange,
	]);

	return {
		clearSelection,
		selection,
		updateSelection,
		isSelectingRef,
		getDOMSelection,
		setIsSelecting,
	};
};
