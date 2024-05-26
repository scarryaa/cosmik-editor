import EditorStore from "@renderer/stores/editors";
import { setSelectedItems, useFileStore } from "@renderer/stores/files";
import TabStore, { TabState } from "@renderer/stores/tabs";
import { VsFile } from "solid-icons/vs";
import { type Component, createMemo } from "solid-js";
import styles from "./FileItem.module.scss";

interface FileItemProps {
	file: string;
	indentLevel: number;
	classList?: { [k: string]: boolean | undefined };
	isIgnored: boolean;
}

const FileItem: Component<FileItemProps> = (props: FileItemProps) => {
	const fileStore = useFileStore();
	const indentSize = 8;
	const currentIndent = props.indentLevel * indentSize;
	const selected = createMemo(() =>
		fileStore.selectedItems.includes(props.file),
	);
	const fileName = createMemo(() => props.file.split("/").pop());

	const handleFileClick = async (e: MouseEvent) => {
		if (e.ctrlKey) {
			toggleFileSelect(props.file);
		} else {
			deselectAllAndSelectItem(props.file);
		}
		TabStore.openTab({
			id: props.file,
			name: props.file.split("/").pop()!,
			state: TabState.Untracked,
			editorId: EditorStore.getActiveEditorId()!,
		});
		// biome-ignore lint/suspicious/noExplicitAny: Needed here
		const contents = await (window.api as any).getFileContents(props.file);
		EditorStore.setEditorContent("editor1", contents);
		TabStore.updateTab(props.file, { content: contents });
	};

	const deselectAllAndSelectItem = (file: string) => {
		setSelectedItems([file]);
	};

	const toggleFileSelect = (file: string) => {
		if (selected()) {
			setSelectedItems(
				fileStore.selectedItems.filter((_file) => _file !== file),
			);
		} else {
			setSelectedItems([...fileStore.selectedItems, props.file]);
		}
	};

	return (
		<div
			class={`${styles["file-container"]} ${
				selected() ? styles.selected : ""
			} ${props.isIgnored ? styles.ignored : ""}`}
			classList={props.classList}
			onclick={handleFileClick}
		>
			<div class={styles.file} style={{ "padding-left": `${currentIndent}px` }}>
				<VsFile />
				<span class={styles["file-name"]}>{fileName()}</span>
			</div>
		</div>
	);
};

export default FileItem;
