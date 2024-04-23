import { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import type { EditorModel } from "../model/editorModel";

/**
 * A custom hook for managing content within a text editor component.
 */
export const useEditorContentManagement = () => {
	const [lines, setLines] = useState<string[]>([]);
	const [lineCount, setLineCount] = useState<number>(1);

	const insertCharacter = useCallback(
		(model: EditorModel, character: string) => {
			model.insert(character);
		},
		[],
	);

	const deleteCharacter = useCallback(
		(model: EditorModel, isDeleteKey = false) => {
			model.delete(isDeleteKey);
		},
		[],
	);

	const updateEditorContent = useCallback((newContent: string) => {
		ReactDOM.unstable_batchedUpdates(() => {
			const newLines = newContent
				.split("\n")
				.map((line) => (line.length === 0 ? "\u200B" : line));
			setLines([...newLines]);
			setLineCount(newLines.length);
		});
	}, []);

	return {
		insertCharacter,
		deleteCharacter,
		updateEditorContent,
		lines,
		lineCount,
	};
};
