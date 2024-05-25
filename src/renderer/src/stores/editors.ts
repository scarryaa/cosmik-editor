import type { Editor } from "@renderer/models/Editor";
import { createStore } from "solid-js/store";
import TabStore from "./tabs";

const [state, setState] = createStore({
	tabContents: {} as { [key: string]: string },
	editors: [] as Editor[],
	activeEditorId: null as string | null,
});

const EditorStore = {
	getTabContent(tabId: string) {
		return state.tabContents[tabId] || "";
	},

	updateTabContent(tabId: string, content: string) {
		setState("tabContents", {
			...state.tabContents,
			[tabId]: content,
		});
		TabStore.updateTab(tabId, { content, state: TabStore.getTabState(tabId) });
	},

	saveTab(tabId: string) {
		TabStore.setTabSaved(tabId, true);
	},

	getEditors() {
		return state.editors;
	},

	getEditor(id: string) {
		return state.editors.find((e) => e.id === id);
	},

	addEditor(editor: Editor) {
		setState("editors", [...state.editors, editor]);
	},

	removeEditor(id: string) {
		setState(
			"editors",
			state.editors.filter((e) => e.id !== id),
		);
	},

	getActiveEditor() {
		return state.editors.find((e) => e.id === state.activeEditorId);
	},

	setActiveEditor(id: string | null) {
		setState("activeEditorId", id);
	},

	getActiveEditorId() {
		return state.activeEditorId;
	},

	setActiveEditorId(id: string | null) {
		setState("activeEditorId", id);
	},

	setEditorContent(id: string, content: string) {
		const editor = state.editors.find((e) => e.id === id);
		if (editor) {
			editor.setContent(content);
		}
	},
};

export default EditorStore;
