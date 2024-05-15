import type { Editor } from "@renderer/models/Editor";
import type { Accessor, Component } from "solid-js";
import styles from "./StatusPane.module.scss";

interface StatusPaneProps {
    editor: Accessor<Editor>;
}

const StatusPane: Component<StatusPaneProps> = (props) => {
    return (
        <div class={styles["status-pane"]}>
            Ln {props.editor().cursorAt(0).line + 1} Col {props.editor().cursorAt(0).character + 1}
        </div>
    );
};

export default StatusPane;