import type { Editor } from "@renderer/models/Editor";
import type { Accessor, Component, Ref } from "solid-js";
import styles from "./EditorCore.module.scss";

interface EditorCoreProps {
	editor: Accessor<Editor>;
	language: string;
	ref?: Ref<HTMLTextAreaElement>;
}

const EditorCore: Component<EditorCoreProps> = (props) => {
	const editor = props.editor();

	const onKeydown = (e: KeyboardEvent) => {
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
				editor.moveLeft(0);
				break;
			case "ArrowRight":
				editor.moveRight(0);
				break;
			case "ArrowUp":
				editor.moveUp(0);
				break;
			case "ArrowDown":
				editor.moveDown(0);
				break;
			default: {
				if (e.key.length === 1) {
					editor.insert(e.key, 0);
				}
			}
		}
	};

	return (
		<div class={styles["editor-core"]}>
			<textarea
				ref={props.ref}
				class={styles["editor-core__textarea"]}
				value={editor.getText()}
				onkeydown={onKeydown}
			/>
		</div>
	);
};

export default EditorCore;
