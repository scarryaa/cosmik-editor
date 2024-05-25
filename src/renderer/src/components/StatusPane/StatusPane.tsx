import type { Editor } from "@renderer/models/Editor";
import type { Accessor, Component } from "solid-js";
import Language from "./Language/Language";
import styles from "./StatusPane.module.scss";

interface StatusPaneProps {
	editor: Accessor<Editor>;
}

const StatusPane: Component<StatusPaneProps> = (props) => {
	return (
		<div class={styles["status-pane"]}>
			<div class={styles["left-side"]}>
				<div class={styles["line-column"]}>
					Ln {props.editor().cursorAt(0).line + 1}, Col{" "}
					{props.editor().cursorAt(0).character + 1}
				</div>
			</div>
			<div class={styles["right-side"]}>
				<Language />
			</div>
		</div>
	);
};

export default StatusPane;
