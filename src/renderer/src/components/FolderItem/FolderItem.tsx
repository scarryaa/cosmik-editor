import {
	openFolders,
	setOpenFolders,
	setSelectedItems,
	useFileStore,
} from "@renderer/stores/files";
import { VsChevronDown, VsChevronRight } from "solid-icons/vs";
import { For, createEffect, createMemo, createSignal } from "solid-js";
import type { Component } from "solid-js";
import FileItem from "../FileItem/FileItem";
import styles from "./FolderItem.module.scss";

interface FolderItemProps {
	folder: string;
	path: string;
	indentLevel: number;
}

interface FolderContents {
	files: string[];
	folders: { name: string; contents: FolderContents | null }[];
}

const FolderItem: Component<FolderItemProps> = (props: FolderItemProps) => {
	const indentSize = 8;
	const currentIndent = props.indentLevel * indentSize;
	const [contents, setContents] = createSignal<FolderContents>({
		files: [],
		folders: [],
	});
	const fileStore = useFileStore();
	const selected = createMemo(() =>
		fileStore.selectedItems.includes(props.path),
	);

	const isOpen = createMemo(() => openFolders.includes(props.path));

	const fetchContents = async (path: string): Promise<FolderContents> => {
		// biome-ignore lint/suspicious/noExplicitAny: Needed here
		const response = await (window.api as any).getFolderContents(path);
		return {
			files: response.files,
			folders: response.folders.map((folder: string) => ({
				name: folder,
				contents: null,
			})),
		};
	};

	const setIsOpen = async () => {
		if (!isOpen()) {
			setOpenFolders([...openFolders, props.path]);
			if (contents().files.length === 0 && contents().folders.length === 0) {
				const response = await fetchContents(props.path);
				setContents(response);
			}
		} else {
			setOpenFolders(openFolders.filter((folder) => folder !== props.path));
		}
	};

	const toggleFolder = async () => {
		await setIsOpen();
	};

	const handleFolderClick = (e: MouseEvent) => {
		if (e.ctrlKey) {
			toggleFolderSelect(props.path);
		} else {
			deselectAllFoldersAndSelect(props.path);
			toggleFolder();
		}
	};

	const deselectAllFoldersAndSelect = (path: string) => {
		setSelectedItems([path]);
	};

	const toggleFolderSelect = (path: string) => {
		if (fileStore.selectedItems.includes(path)) {
			setSelectedItems(
				fileStore.selectedItems.filter((folder) => folder !== path),
			);
		} else {
			setSelectedItems([...fileStore.selectedItems, path]);
		}
	};

	createEffect(async () => {
		if (
			isOpen() &&
			contents().files.length === 0 &&
			contents().folders.length === 0
		) {
			const response = await fetchContents(props.path);
			setContents(response);
			for (const folder of response.folders) {
				const childPath = `${props.path}/${folder.name}`;
				if (openFolders.includes(childPath)) {
					const childResponse = await fetchContents(childPath);
					setContents((prevContents) => ({
						files: prevContents.files,
						folders: prevContents.folders.map((f) =>
							f.name === folder.name ? { ...f, contents: childResponse } : f,
						),
					}));
				}
			}
		}
	});

	return (
		<div class={`${styles["folder-container"]}`}>
			<div
				onclick={handleFolderClick}
				class={`${styles.folder} ${selected() ? styles.selected : ""}`}
				style={{ "padding-left": `${currentIndent}px` }}
			>
				<span>
					{isOpen() ? (
						<VsChevronDown style={{ margin: 0, padding: 0 }} />
					) : (
						<VsChevronRight style={{ margin: 0, padding: 0 }} />
					)}
				</span>
				<span class={styles["folder-name"]}>{props.folder}</span>
			</div>
			{isOpen() && (
				<div>
					<For each={contents().folders}>
						{(folder) => (
							<FolderItem
								folder={folder.name}
								path={`${props.path}/${folder.name}`}
								indentLevel={props.indentLevel + 1}
							/>
						)}
					</For>
					<For each={contents().files}>
						{(file) => (
							<FileItem file={file} indentLevel={props.indentLevel + 1} />
						)}
					</For>
				</div>
			)}
		</div>
	);
};

export default FolderItem;
