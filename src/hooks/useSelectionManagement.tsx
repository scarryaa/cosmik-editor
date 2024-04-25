import { useCallback, useEffect, useRef, useState } from "react";
import type { EditorModel } from "../model/editorModel";
import {
	Selection,
	SelectionDirection,
	SelectionEvents,
} from "../model/selectionModel";

/**TODO
 * update cursor position with selection (and after finalizing selection)
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
	const selectionSourceRef = useRef<'keyboard' | 'mouse' | null>(null);

	const applyDOMSelection = (selection: Selection) => {
		const editor = editorContainerRef.current;
		const _selection = document.getSelection();

		if (!_selection || !editor) return;

		const range = document.createRange();

		const startNode = findTextNode(editor, selection.startLine);
		const endNode = findTextNode(editor, selection.endLine);
		if (!startNode || !endNode) return;

		const startOffset = findCharacterOffset(startNode, selection.selectionStart);
		const endOffset = findCharacterOffset(endNode, selection.selectionEnd);

		range.setStart(startNode, startOffset);
		range.setEnd(endNode, endOffset);

		// requestAnimationFrame is needed or else the visible
		// selection disappears due to React re-renders
		requestAnimationFrame(() => {
			selectionSourceRef.current = null;
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
	}, [editorModelRef]);

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
			range.startOffset,
			(range.startOffset > range.endOffset || endLine < startLine)
				? SelectionDirection.left
				: SelectionDirection.right,
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
					newSelection.selectionStart,
					newSelection.selectionEnd,
					newSelection.selectionStart,
					newSelection.direction,
				);
			});

			if (selectionSourceRef.current === 'keyboard') {
				applyDOMSelection(newSelection);
			}
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
				model.updateSelection(newSelection);
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
	}, [editorContainerRef, editorModelRef, createSelectionFromRange]);

	return {
		clearSelection,
		selection,
		isSelectingRef,
		getDOMSelection,
		setIsSelecting,
		selectionSourceRef,
	};
};
