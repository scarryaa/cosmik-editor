import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { measureTextWidth } from "../../util/text";
import { cursorVertOffset } from "../AstroEditor/AstroEditor";

export const calculateCursorVerticalPosition = ($editor: Editor) => {
	return lineHeight * $editor.getCursor().getPosition().line + cursorVertOffset;
};

export const calculateCursorHorizontalPosition = ($editor: Editor) => {
	const cursorPosition = $editor.getCursor().getPosition();
	const lineContent =
		$editor.getContent()[cursorPosition.line]?.getContent() ?? "";
	const textUpToCursor = lineContent.substring(0, cursorPosition.character);

	return measureTextWidth(textUpToCursor);
};
