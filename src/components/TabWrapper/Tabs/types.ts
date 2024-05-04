import type { CursorPosition } from "../../../models/Cursor";

export interface Tab {
	id: string;
	name: string;
	icon?: string;
	isActive: boolean;
	tooltip: string;
	contentModified: boolean;
	isHovered: boolean;
	cursorPosition: CursorPosition;
	scrollPosition: { left: number, top: number };
}
