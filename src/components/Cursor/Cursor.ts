import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { cursorVertOffset } from "../AstroEditor/AstroEditor";

export const calculateCursorVerticalPosition = (
	$editor: Editor,
	$app: HTMLDivElement,
) => {
	return (
		lineHeight * $editor.getCursor().getPosition().line -
		$app.scrollTop +
		cursorVertOffset
	);
};
