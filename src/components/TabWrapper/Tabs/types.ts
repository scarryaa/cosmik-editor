import type { CursorPosition } from "../../../models/Cursor";
import type { EditorState } from "../../../models/Editor";

export interface Tab {
	id: string;
	name: string;
	icon?: string;
	isActive: boolean;
	tooltip: string;
	contentModified: boolean;
	isHovered: boolean;
	cursorPosition: CursorPosition;
	scrollPosition: { left: number; top: number };
	undoStack: EditorState[];
	redoStack: EditorState[];
	paneId: string | null;
	editorInstanceId: string;
}
