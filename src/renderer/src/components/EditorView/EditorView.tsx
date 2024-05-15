import { lineHeight } from "@renderer/const/const";
import type { Editor } from "@renderer/models/Editor";
import { type Accessor, type Component, createSignal } from "solid-js";
import Cursor from "../Cursor/Cursor";
import EditorLine from "../EditorLine/EditorLine";
import LineNumbers from "../LineNumbers/LineNumbers";
import styles from "./EditorView.module.scss";

interface EditorViewProps {
	editor: Accessor<Editor>;
	click: () => void;
}

const EditorView: Component<EditorViewProps> = (props) => {
	const [viewScrollTop, setViewScrollTop] = createSignal(0);

	return (
		<div onclick={props.click} class={styles["editor-view"]}>
			<div class={styles["editor-view-inner"]}>
				<div class={styles["editor-line-numbers"]}>
					<LineNumbers top={viewScrollTop} editor={props.editor} />
				</div>
				<div
					class={styles["editor-content-container"]}
					onscroll={(e) => {
						setViewScrollTop(e.target.scrollTop);
					}}
				>
					<div class={styles["editor-lines-padding"]}>
						<div class={styles["editor-lines"]}>
							{props
								.editor()
								.getText()
								.split("\n")
								.map((text, index) => (
									// biome-ignore lint/correctness/useJsxKeyInIterable: Not needed
									<EditorLine content={text} line={index} />
								))}
							<div
								class={styles["editor-line-padding"]}
								style={`top: ${
									props.editor().totalLines() * lineHeight
								}px;`}
							/>
							{props.editor().cursors.map((cursor) => (
								// biome-ignore lint/correctness/useJsxKeyInIterable: Not needed
								<Cursor editor={props.editor} cursor={() => cursor} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorView;
