import {
	cursorHorizontalOffset,
	cursorVerticalOffset,
	lineHeight,
} from "@renderer/const/const";
import type { Cursor as CursorModel } from "@renderer/models/Cursor";
import type { Editor } from "@renderer/models/Editor";
import { textService } from "@renderer/services/textService";
import type { Accessor, Component } from "solid-js";
import { createMemo } from "solid-js";
import styles from "./Cursor.module.scss";

interface CursorProps {
	editor: Accessor<Editor>;
	cursor: Accessor<CursorModel>;
	ref?: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
}

const Cursor: Component<CursorProps> = (props: CursorProps) => {
	const line = createMemo(() => props.cursor().line);
	const character = createMemo(() => props.cursor().character);

	const calculateHorizontalPosition = (_: number) => {
		const lineIndex = Math.min(line(), props.editor().numberOfLines() - 1);
		return (
			textService.measureTextWidth(
				props.editor().lineContent(lineIndex).substring(0, character()),
				"Hack",
				14,
			) + cursorHorizontalOffset
		);
	};

	const calculateVerticalPosition = (line: number) => {
		return (
			Math.min(line, props.editor().numberOfLines()) * lineHeight +
			cursorVerticalOffset
		);
	};

	const horizontalPosition = createMemo(() =>
		calculateHorizontalPosition(character()),
	);
	const verticalPosition = createMemo(() => calculateVerticalPosition(line()));

	return (
		<div
			ref={props.ref}
			class={styles.cursor}
			style={{
				transform: `translateX(${horizontalPosition()}px) translateY(${verticalPosition()}px)`,
			}}
		/>
	);
};

export default Cursor;
