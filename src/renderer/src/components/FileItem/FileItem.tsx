import { VsFile } from "solid-icons/vs";
import type { Component } from "solid-js";
import styles from "./FileItem.module.scss";

interface FileItemProps {
	file: string;
	indentLevel: number;
}

const FileItem: Component<FileItemProps> = (props: FileItemProps) => {
	const indentSize = 8;
	const currentIndent = props.indentLevel * indentSize;

	return (
		<div class={styles["file-container"]}>
			<div class={styles.file} style={{ "padding-left": `${currentIndent}px` }}>
			<VsFile />
				<span
					class={styles["file-name"]}
				>
					{props.file}
				</span>
			</div>
		</div>
	);
};

export default FileItem;
