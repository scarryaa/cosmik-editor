import { lineHeight } from "@renderer/const/const";
import type { Component } from "solid-js";
import styles from "./EditorLine.module.scss";

interface EditorLineProps {
	line: number;
	content: string;
}

const EditorLine: Component<EditorLineProps> = (props: EditorLineProps) => {
	return (
		<div style={`top: ${props.line * lineHeight}px;`} class={styles.line}>
			{props.content}
		</div>
	);
};

export default EditorLine;
