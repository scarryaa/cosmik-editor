import type { IApp } from "../types/IApp";
import type { IEditor } from "../types/IEditor";
import type { ITab } from "../types/ITab";
import { generateGUID } from "../util/util";
import { Editor } from "./Editor.svelte";

export class App implements IApp {
	editors: Map<string, Editor> = $state(new Map());
	currentEditorId: string | null = $state(null);

	constructor() {
		this.addEditor(new Editor("", generateGUID()));
	}

	addEditor = (editor: IEditor): string => {
		const guid = generateGUID();
		this.editors.set(guid, editor);
		if (!this.currentEditorId) {
			// Automatically select the first editor
			this.currentEditorId = guid;
		}
		return guid;
	}

	removeEditor = (guid: string): boolean => {
		if (this.editors.has(guid)) {
			this.editors.delete(guid);
			if (this.currentEditorId === guid) {
				this.currentEditorId = null;
				if (this.editors.size > 0) {
					this.currentEditorId = this.editors.keys().next().value;
				}
			}
			return true;
		}
		return false;
	}

	switchEditor = (guid: string): boolean => {
		if (this.editors.has(guid)) {
			this.currentEditorId = guid;
			return true;
		}
		return false;
	}

	getCurrentEditor = (): Editor | null => {
		if (this.currentEditorId) {
			return this.editors.get(this.currentEditorId) || null;
		}
		return null;
	}

	setEditorFromTab = (tab: ITab): void => {
        if (!tab.editor) return;
        this.currentEditorId = tab.editor.id;
        const currentEditor = this.editors.get(this.currentEditorId);
        if (currentEditor) {
            currentEditor.setContent(tab.content);
			// @TODO fix as cast
            this.editors.set(this.currentEditorId, tab.editor as Editor);
        }
    }
}
