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
				editor.insert("\t", 0);
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
