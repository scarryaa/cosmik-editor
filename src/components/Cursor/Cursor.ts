import { lineHeight } from "../../const/const";
import type { Editor } from "../../models/Editor";
import { measureTextWidth } from "../../util/text";
import { cursorVertOffset } from "../AstroEditor/AstroEditor";

export const calculateCursorVerticalPosition = (
	tabsWrapperHeight: number,
	$editor: Editor,
	scrollPosition: number,
) => {
	return (
		lineHeight * $editor.getCursor().getPosition().line -
		scrollPosition +
		tabsWrapperHeight +
		cursorVertOffset
	);
};

export const calculateCursorHorizontalPosition = (
	$editor: Editor,
	cursorLeft: number,
	scrollPosition: number,
) => {
	const cursorPosition = $editor.getCursor().getPosition();
	const lineContent =
		$editor.getContent()[cursorPosition.line]?.getContent() ?? "";
	const textUpToCursor = lineContent.substring(0, cursorPosition.character);

	return measureTextWidth(textUpToCursor) - scrollPosition + cursorLeft;
};
