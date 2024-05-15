import { lineHeight } from "@renderer/const/const";
import type { Component } from "solid-js";
import styles from "./EditorLine.module.scss";

interface EditorLineProps {
	line: number;
	content: string;
	ref;
}

const EditorLine: Component<EditorLineProps> = (props: EditorLineProps) => {
	return (
		<div
			ref={props.ref}
			style={`top: ${props.line * lineHeight}px;`}
			class={styles.line}
		>
			{props.content}
		</div>
	);
};

export default EditorLine;
