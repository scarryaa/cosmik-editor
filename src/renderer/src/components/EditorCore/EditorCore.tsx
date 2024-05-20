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

	const onKeydown = async (e: KeyboardEvent) => {
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
		const cursor = editor.cursorAt(0);
		const lineContent = editor.lineContent(cursor.line);
		const prevLineIndex = editor.lineContent(cursor.line - 1).length;

		switch (e.key) {
			case "P": {
				if (e.ctrlKey && e.shiftKey) {
					e.preventDefault();
				} else if (e.ctrlKey) {
					e.preventDefault();
				} else {
					editor.insert("P", 0);
				}
				break;
			}
			case "p":
				{
					if (e.ctrlKey && e.shiftKey) {
						e.preventDefault();
					} else if (e.ctrlKey) {
						e.preventDefault();
					} else {
						editor.insert("p", 0);
					}
				}
				break;
			case "S":
				{
					if (e.ctrlKey && e.shiftKey) {
						e.preventDefault();
					} else {
						editor.insert("S", 0);
					}
				}
				break;
			case "s":
				{
					if (e.ctrlKey) {
						e.preventDefault();
					} else {
						editor.insert("s", 0);
					}
				}
				break;
			case "a":
				{
					if (e.ctrlKey) {
						e.preventDefault();
						editor.selectAll();
					} else {
						editor.insert("a", 0);
					}
				}
				break;
			case "A":
				{
					if (e.ctrlKey) {
						e.preventDefault();
					} else {
						editor.insert("A", 0);
					}
				}
				break;
			case "c":
				{
					if (e.ctrlKey) {
						e.preventDefault();
						const text = editor.copy();
						window.api.copy(text);
					} else {
						editor.insert("c", 0);
					}
				}
				break;
			case "C":
				{
					if (e.ctrlKey) {
						e.preventDefault();
					} else {
						editor.insert("C", 0);
					}
				}
				break;
			case "v":
				{
					if (e.ctrlKey) {
						e.preventDefault();
						const text = await window.api.paste();
						editor.paste(text);
					} else {
						editor.insert("v", 0);
					}
				}
				break;
			case "V":
				{
					if (e.ctrlKey) {
						e.preventDefault();
						const text = await window.api.paste();
						editor.paste(text);
					} else {
						editor.insert("V", 0);
					}
				}
				break;
			case "x":
				{
					if (e.ctrlKey) {
                        e.preventDefault();
                        const text = editor.cut();
                        editor.delete(0);
                        window.api.copy(text);
                    } else {
                        editor.insert("x", 0);
                    }
				}
				break;
				case "X":
					{
						if (e.ctrlKey) {
							e.preventDefault();
							const text = editor.cut();
							editor.delete(0);
							window.api.copy(text);
						} else {
							editor.insert("X", 0);
						}
					}
					break;
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
					editor
						.getSelection(0)
						?.handleSelectionLeft(
							editor.cursorAt(0),
							lineContent.length,
							prevLineIndex,
							editor.totalLines(),
						);
				} else {
					editor.clearSelection(0);
				}
				editor.moveLeft(0);
				break;
			case "ArrowRight":
				if (e.shiftKey) {
					editor
						.getSelection(0)
						?.handleSelectionRight(
							editor.cursorAt(0),
							lineContent.length,
							prevLineIndex,
							editor.totalLines(),
						);
				} else {
					editor.clearSelection(0);
				}
				editor.moveRight(0);
				break;
			case "ArrowUp":
				if (e.shiftKey) {
					editor
						.getSelection(0)
						?.handleSelectionUp(
							editor.cursorAt(0),
							lineContent.length,
							prevLineIndex,
							editor.totalLines(),
						);
				} else {
					editor.clearSelection(0);
				}
				editor.moveUp(0);
				break;
			case "ArrowDown":
				if (e.shiftKey) {
					editor
						.getSelection(0)
						?.handleSelectionDown(
							editor.cursorAt(0),
							lineContent.length,
							prevLineIndex,
							editor.totalLines(),
						);
				} else {
					editor.clearSelection(0);
				}
				editor.moveDown(0);
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
