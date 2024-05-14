import { Editor } from "./Editor.svelte";

export class App {
	editors: Map<string, Editor> = $state(new Map());
	currentEditorId: string | null = $state(null);

	constructor() {
		this.addEditor(new Editor(""));
	}

	addEditor = (editor: Editor): string => {
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
}
