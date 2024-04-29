import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { cursorVertOffset } from "../AstroEditor/AstroEditor";

export const calculateCursorVerticalPosition = (
	$editor: Editor,
	scrollPosition: number,
) => {
	return (
		lineHeight * $editor.getCursor().getPosition().line -
		scrollPosition +
		cursorVertOffset
	);
};
