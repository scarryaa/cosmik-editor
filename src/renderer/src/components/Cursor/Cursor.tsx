import { lineHeight } from "@renderer/const/const";
import type { Cursor as CursorModel } from "@renderer/models/Cursor";
import type { Editor } from "@renderer/models/Editor";
import { textService } from "@renderer/services/textService";
import type { Accessor, Component } from "solid-js";
import { createMemo } from "solid-js";
import styles from "./Cursor.module.scss";

interface CursorProps {
	editor: Accessor<Editor>;
	cursor: Accessor<CursorModel>;
}

const Cursor: Component<CursorProps> = (props: CursorProps) => {
	const line = createMemo(() => props.cursor().line);
	const character = createMemo(() => props.cursor().character);

	const calculateHorizontalPosition = (_: number) => {
		const lineIndex = Math.min(line(), props.editor().numberOfLines() - 1);
		return textService.measureTextWidth(
			props.editor().lineContent(lineIndex),
			"Hack",
			14,
		);
	};

	const calculateVerticalPosition = (line: number) => {
		return Math.min(line, props.editor().numberOfLines() - 1) * lineHeight;
	};

	return (
		<div
			class={styles.cursor}
			style={`left: ${calculateHorizontalPosition(
				character(),
			)}px; top: ${calculateVerticalPosition(line())}px;`}
		/>
	);
};

export default Cursor;
