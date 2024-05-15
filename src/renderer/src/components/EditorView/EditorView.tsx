import type { Editor } from "@renderer/models/Editor";
import type { Accessor, Component } from "solid-js";
import Cursor from "../Cursor/Cursor";
import styles from "./EditorView.module.scss";

interface EditorViewProps {
	editor: Accessor<Editor>;
	click: () => void;
}

const EditorView: Component<EditorViewProps> = (props) => {
	return (
		<div onclick={props.click} class={styles["editor-view"]}>
			{props.editor().getText()}
			{props.editor().cursors.map((cursor, _) => (
				// biome-ignore lint/correctness/useJsxKeyInIterable: Not needed
				<Cursor editor={props.editor} cursor={() => cursor} />
			))}
		</div>
	);
};

export default EditorView;
