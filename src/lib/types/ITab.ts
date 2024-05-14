import type { Editor } from "../models/Editor.svelte";
import type { ICursor } from "./ICursorPosition";
import type { IEditor } from "./IEditor";

export interface ITab {
	id: string;
	name: string;
	icon?: string;
	isActive: boolean;
	tooltip: string;
	contentModified: boolean;
	isHovered: boolean;
	cursorPosition: ICursor;
	scrollPosition: { left: number; top: number };
	content: string;
	editor: IEditor | null;
	// undoStack: EditorState[];
	// redoStack: EditorState[];
}