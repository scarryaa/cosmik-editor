import { lineHeight } from "@renderer/const/const";
import type { Editor } from "@renderer/models/Editor";
import EditorStore from "@renderer/stores/editors";
import { setParserTree } from "@renderer/stores/parser-tree";
import TabStore, { TabState } from "@renderer/stores/tabs";
import { getNumberOfLinesOnScreen } from "@renderer/util/util";
import {
	type Accessor,
	type Component,
	type Ref,
	createEffect,
} from "solid-js";
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

		const isShortcut = (key: string, ctrl = false, shift = false) =>
			e.key.toLowerCase() === key.toLowerCase() &&
			e.ctrlKey === ctrl &&
			e.shiftKey === shift;

		const handleArrowKey = (direction: "Left" | "Right" | "Up" | "Down") => {
			if (e.shiftKey) {
				editor
					.getSelection(0)
					?.[`handleSelection${direction}`](
						editor.cursorAt(0),
						editor.lineContent(editor.cursorAt(0).line).length,
						editor.lineBreakIndices[Math.max(editor.cursorAt(0).line - 1, 0)],
						editor.totalLines(),
					);
			} else {
				editor.clearSelection(0);
			}
			switch (direction) {
				case "Left":
					editor.moveLeft(0);
					break;
				case "Right":
					editor.moveRight(0);
					break;
				case "Up":
					editor.moveUp(0);
					break;
				case "Down":
					editor.moveDown(0);
					break;
			}
		};

		switch (e.key) {
			case "Enter":
				editor.addLine(0);
				break;
			case "Backspace":
			case "Delete":
				editor.delete(0);
				break;
			case "Tab":
				e.preventDefault();
				editor.tab(0);
				break;
			case "a":
				if (isShortcut("a", true)) {
					e.preventDefault();
					editor.selectAll();
				} else {
					editor.insert("a", 0);
				}
				break;
			case "c":
				if (isShortcut("c", true)) {
					e.preventDefault();
					const text = editor.copy();
					window.api.copy(text);
				} else {
					editor.insert("c", 0);
				}
				break;
			case "v":
			case "V":
				if (isShortcut("v", true)) {
					e.preventDefault();
					const text = await window.api.paste();
					editor.paste(text);
				} else {
					editor.insert(e.key, 0);
				}
				break;
			case "x":
			case "X":
				if (isShortcut("x", true)) {
					e.preventDefault();
					const text = editor.cut();
					window.api.copy(text);
				} else {
					editor.insert(e.key, 0);
				}
				break;
			case "n":
				if (isShortcut("n", true)) {
					e.preventDefault();
					TabStore.openTab({
						editorId: EditorStore.getActiveEditor()?.id!,
						id: `Untitled-${TabStore.tabs.length + 1}`,
						name: `Untitled-${TabStore.tabs.length + 1}`,
						state: TabState.Untracked,
					});
				} else {
					editor.insert(e.key, 0);
				}
				break;
			case "w":
				if (isShortcut("w", true)) {
					e.preventDefault();
					TabStore.closeTab(TabStore.activeTab?.id!);
				} else {
					editor.insert(e.key, 0);
				}
				break;
			case "s":
			case "S":
				if (isShortcut("s", true)) {
					e.preventDefault();
				} else {
					editor.insert(e.key, 0);
				}
				break;
			case "ArrowLeft":
				handleArrowKey("Left");
				break;
			case "ArrowRight":
				handleArrowKey("Right");
				break;
			case "ArrowUp":
				handleArrowKey("Up");
				break;
			case "ArrowDown":
				handleArrowKey("Down");
				break;
			case "Home":
				editor.moveToLineStart(0);
				break;
			case "End":
				editor.moveToLineEnd(0);
				break;
			case "PageUp":
				editor.moveTo(
					editor.cursorAt(0).character,
					editor.cursorAt(0).line - getNumberOfLinesOnScreen(lineHeight),
					0,
				);
				break;
			case "PageDown":
				editor.moveTo(
					editor.cursorAt(0).character,
					editor.cursorAt(0).line + getNumberOfLinesOnScreen(lineHeight),
					0,
				);
				break;
			default:
				if (e.key.length === 1) {
					editor.insert(e.key, 0);
				}
		}

		if (scrollActions.includes(e.key) || e.key.length === 1) {
			props.ensureCursorVisible();
		}

		window.api.parseRequest(editor.getText());
	};

	createEffect(() => {
		window.api.onParseResult((_, serializedTree) => {
			if (serializedTree.error) {
				console.error("Error parsing text:", serializedTree.error);
			} else {
				const rootNode = JSON.parse(serializedTree);
				setParserTree(rootNode);
			}
		});
	});

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
