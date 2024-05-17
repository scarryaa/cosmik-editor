import { lineHeight } from "@renderer/const/const";
import type { Editor } from "@renderer/models/Editor";
import { getNumberOfLinesOnScreen } from "@renderer/util/util";
import type { Accessor, Component, Ref } from "solid-js";
import styles from "./EditorCore.module.scss";

interface EditorCoreProps {
	editor: Accessor<Editor>;
	language: string;
	ref?: Ref<HTMLTextAreaElement>;
	ensureCursorVisible: () => void;
}

const EditorCore: Component<EditorCoreProps> = (props) => {
	const editor = props.editor();

	const onKeydown = (e: KeyboardEvent) => {
		const scrollActions = [
			"Enter",
			"Backspace",
			"Delete",
			"Tab",
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown",
			"Home",
			"End",
			"PageUp",
			"PageDown",
		];

		e.preventDefault();

		switch (e.key) {
			case "Enter":
				editor.addLine(0);
				break;
			case "Backspace":
				editor.delete(0);
				break;
			case "Delete":
				editor.delete(0);
				break;
			case "Tab":
				editor.tab(0);
				break;
			case "ArrowLeft":
				if (e.shiftKey) {
					editor.getSelection(0)?.expandLeft();
				} else {
					editor.moveLeft(0);
				}
				break;
			case "ArrowRight":
				if (e.shiftKey) {
					editor.getSelection(0)?.expandRight();
                } else {
                    editor.moveRight(0);
                }
				break;
			case "ArrowUp":
				if (e.shiftKey) {
					editor.getSelection(0)?.expandUp();
                } else {
					editor.moveUp(0);
				}
				break;
			case "ArrowDown":
				if (e.shiftKey) {
					editor.getSelection(0)?.expandDown();
                } else {
                    editor.moveDown(0);
                }
				break;
			case "Home":
				editor.moveToLineStart(0);
				break;
			case "End":
				editor.moveToLineEnd(0);
				break;
			case "PageUp":
				editor.moveTo(
					0,
					editor.cursorAt(0).character,
					editor.cursorAt(0).line - getNumberOfLinesOnScreen(lineHeight),
				);
				break;
			case "PageDown":
				editor.moveTo(
					0,
					editor.cursorAt(0).character,
					editor.cursorAt(0).line + getNumberOfLinesOnScreen(lineHeight),
				);
				break;
			default:
				if (e.key.length === 1) {
					editor.insert(e.key, 0);
					break;
				}
		}

		if (scrollActions.includes(e.key) || e.key.length === 1) {
			props.ensureCursorVisible();
		}
	};

	return (
		<div class={styles["editor-core"]}>
			<textarea
				ref={props.ref}
				class={styles["editor-core__textarea"]}
				onkeydown={onKeydown}
			/>
		</div>
	);
};

export default EditorCore;
