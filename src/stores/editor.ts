import { get, writable } from "svelte/store";
import {
	cursorHorizOffset,
	cursorVertOffset,
} from "../components/AstroEditor/AstroEditor";
import type { Editor, EditorState } from "../models/Editor";

export const cursorVertPos = writable(cursorVertOffset);
export const cursorHorizPos = writable(cursorHorizOffset);
export const showEditor = writable<boolean>(false);

function createEditorStore() {
	const editors = writable<{ id: string; instance: Editor }[]>([]);
	const focusedEditorId = writable<string | null>(null);

	function addEditor(editorInstance: Editor) {
		const id = crypto.randomUUID();
		editorInstance.setId(id);
		editors.update((currentEditors) => [
			...currentEditors,
			{ id, instance: editorInstance },
		]);
	}

	function removeEditor(editorId: string) {
		editors.update((currentEditors) =>
			currentEditors.filter((editor) => editor.id !== editorId),
		);
	}

	function setFocusedEditorId(id: string | null) {
		focusedEditorId.set(id);
	}

	function getCurrentEditor() {
		const allEditors = get(editors);
		const currentEditorId = get(focusedEditorId);

		const currentEditor = allEditors.find(
			(editor) => editor.id === currentEditorId,
		);
		return currentEditor ? currentEditor.instance : null;
	}

	function updateCurrentEditor(action: (editor: Editor) => void) {
		editors.update((allEditors) => {
			return allEditors.map((editor) => {
				if (editor.id === get(focusedEditorId)) {
					action(editor.instance);
				}
				return editor;
			});
		});
	}

	return {
		editors,
		addEditor,
		removeEditor,
		setFocusedEditorId,
		getCurrentEditor,
		updateCurrentEditor,
	};
}

export const {
	editors,
	addEditor,
	removeEditor,
	setFocusedEditorId,
	getCurrentEditor,
	updateCurrentEditor,
} = createEditorStore();
