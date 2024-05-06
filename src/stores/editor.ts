import { get, writable } from "svelte/store";
import type { Editor } from "../models/Editor";
import { addPane, panes } from "./pane";

export const showEditor = writable<boolean>(false);

export const createEditorStore = () => {
	const editors = writable<{ id: string; instance: Editor }[]>([]);
	const focusedEditorId = writable<string | null>(null);

	function addEditor(editorInstance: Editor) {
		const id = crypto.randomUUID();
		editorInstance.setId(id);
		const paneId = crypto.randomUUID();
		editorInstance.setPaneId(paneId);

		addPane(paneId, { id: paneId });

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

	function getEditorInstanceById(editorId: string) {
		const allEditors = get(editors);
		const currentEditor = allEditors.find((editor) => editor.id === editorId);
		return currentEditor ? currentEditor.instance : null;
	}

	return {
		editors,
		addEditor,
		removeEditor,
		focusedEditorId,
		setFocusedEditorId,
		getCurrentEditor,
		updateCurrentEditor,
		getEditorInstanceById,
	};
};

export const {
	editors,
	addEditor,
	removeEditor,
	focusedEditorId,
	setFocusedEditorId,
	getCurrentEditor,
	updateCurrentEditor,
	getEditorInstanceById,
} = createEditorStore();
