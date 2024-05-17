import FileItem from "@renderer/components/FileItem/FileItem";
import FolderItem from "@renderer/components/FolderItem/FolderItem";
import TabStore, { TabState } from "@renderer/stores/tabs";
import {
	VsChevronDown,
	VsCollapseAll,
	VsNewFile,
	VsNewFolder,
	VsRefresh,
} from "solid-icons/vs";
import { For, createEffect, createSignal, onMount } from "solid-js";
import { onCleanup } from "solid-js";
import {
	setFileContent,
	setFolderContent,
	setOpenFolders,
	useFileStore,
} from "../../../stores/files";
import styles from "./Explorer.module.scss";

interface FolderResponse {
	path: string;
	files?: string[];
	folders?: string[];
}

const Explorer = () => {
	const [rootOpen, setRootOpen] = createSignal(true);
	const [explorerHeight, setExplorerHeight] = createSignal<number | null>(null);
	const fileStore = useFileStore();
	const [explorerScroll, setExplorerScroll] = createSignal<number>(0);
	let explorerRef: HTMLDivElement | undefined;
	let headerRef: HTMLDivElement | undefined;

	// biome-ignore lint/suspicious/noExplicitAny: Needed here
	const api = window.api as any;

	createEffect(() => {
		api.onFileOpened((_, response) => {
			// Open a new tab
			setFileContent(response.data);
			TabStore.openTab({
				editorId: "editor1",
				id: response.path,
				name: response.path.split("/").pop()!,
				state: TabState.Untracked,
			});
		});

		api.onFolderOpened(async (_, response: FolderResponse) => {
			if (!response || !response.files) {
				console.error("Invalid folder response:", response);
				return;
			}

			fetchAndSetFolderContents(response);
			updateExplorerHeight();
		});
	});

	const fetchAndSetFolderContents = async (response: FolderResponse) => {
		let files: string[] = [];
		let folders: string[] = [];

		if (!response.files) return;

		const fullPaths = await Promise.all(
			response.files.map(async (file) => {
				const fullPath = api.joinPath(response.path, file);
				const isDirectory = await api.isDirectory(fullPath);
				return { name: file, path: fullPath, isDirectory };
			}),
		);

		for (const result of fullPaths) {
			if (result.isDirectory) {
				folders.push(result.name);
			} else {
				files.push(result.path);
			}
		}

		setFolderContent({ root: response.path, folders, files });
	};

	const handleNewFolderClick = () => {
		// Filter to get the last selected folder
		const lastSelectedFolder = fileStore.selectedItems
			.filter((item) => item.endsWith("/"))
			.slice(-1)[0];

		if (lastSelectedFolder) {
			const folderPath = lastSelectedFolder;
			const newFolderName = "newfolder/";
			const newFolderPath = `${folderPath}${newFolderName}`;

			api
				.createFolder(newFolderPath)
				.catch((error) => {
					console.error(`Failed to create folder: ${newFolderPath}`, error);
				});
		} else {
			// No folder selected, try to find the parent folder of the last selected file
			const lastSelectedFile = fileStore.selectedItems
				.filter((item) => !item.endsWith("/"))
				.slice(-1)[0];

			if (lastSelectedFile) {
				const parentFolderPath = lastSelectedFile.substring(
					0,
					lastSelectedFile.lastIndexOf("/") + 1,
				);
				const newFolderName = "newfolder/";
				const newFolderPath = `${parentFolderPath}${newFolderName}`;

				api
					.createFolder(newFolderPath)
					.then(() => {
						console.log(`Folder created successfully at ${newFolderPath}`);
					})
					.catch((error) => {
						console.error(`Failed to create folder: ${newFolderPath}`, error);
					});
			} else {
				console.error("No folder or file selected");
			}
		}
	};

	const handleNewFileClick = (e: MouseEvent) => {
		// Filter to get the last selected folder
		const lastSelectedFolder = fileStore.selectedItems
			.filter((item) => item.endsWith("/"))
			.slice(-1)[0];

		if (lastSelectedFolder) {
			const folderPath = lastSelectedFolder;
			const newFileName = "newfile";
			const newFilePath = `${folderPath}${newFileName}`;

			api
				.createFile(newFilePath)
				.then(() => {
					console.log(`File created successfully at ${newFilePath}`);
				})
				.catch((error) => {
					console.error(`Failed to create file: ${newFilePath}`, error);
				});
		} else {
			// No folder selected, try to find the parent folder of the last selected file
			const lastSelectedFile = fileStore.selectedItems
				.filter((item) => !item.endsWith("/"))
				.slice(-1)[0];

			if (lastSelectedFile) {
				const parentFolderPath = lastSelectedFile.substring(
					0,
					lastSelectedFile.lastIndexOf("/") + 1,
				);
				const newFileName = "newfile";
				const newFilePath = `${parentFolderPath}${newFileName}`;

				api
					.createFile(newFilePath)
					.then(() => {
						console.log(`File created successfully at ${newFilePath}`);
					})
					.catch((error) => {
						console.error(`Failed to create file: ${newFilePath}`, error);
					});
			} else {
				console.error("No folder or file selected");
			}
		}
	};

	const clearOpenFolders = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setOpenFolders([]);
	};

	const refreshFolders = async () => {
		fetchAndSetFolderContents({
			path: fileStore.folderContent.root,
			files: [
				...fileStore.folderContent.folders,
				...fileStore.folderContent.files,
			],
		});
		toggleRootOpen();
	};

	const toggleRootOpen = () => {
		setRootOpen(!rootOpen());
		if (!rootOpen()) setExplorerScroll(0);
	};

	const updateExplorerHeight = () => {
		if (explorerRef && headerRef) {
			const availableHeight = window.innerHeight - headerRef.clientHeight - 85; // Manual height for now
			setExplorerHeight(availableHeight);
		}
	};

	onMount(() => {
		updateExplorerHeight();
		window.addEventListener("resize", updateExplorerHeight);
		onCleanup(() => {
			window.removeEventListener("resize", updateExplorerHeight);
		});
	});

	const renderExplorerContent = () => {
		return (
			<div class={styles["explorer-content"]}>
				{fileStore.folderContent.root.length !== 0 && (
					<div
						class={`${styles["explorer-content-header"]} ${
							explorerScroll() !== 0 && rootOpen()
								? styles["header-gradient"]
								: ""
						}`}
						onclick={toggleRootOpen}
						ref={headerRef}
					>
						<VsChevronDown
							class={rootOpen() ? styles.rotateDown : styles.rotateRight}
						/>
						<h3>{fileStore.folderContent.root.split("/").pop()}</h3>
						<div class={styles["explorer-actions"]}>
							<button
								type="button"
								class={`${styles["explorer-action"]} no-button-style`}
								onclick={(e) => handleNewFileClick(e)}
							>
								<VsNewFile font-size="16" />
							</button>
							<button
								type="button"
								class={`${styles["explorer-action"]} no-button-style`}
								onclick={(e) => handleNewFolderClick()}
							>
								<VsNewFolder font-size="16" />
							</button>
							<button
								type="button"
								class={`${styles["explorer-action"]} no-button-style`}
								onclick={() => refreshFolders()}
							>
								<VsRefresh font-size="16" />
							</button>
							<button
								type="button"
								class={`${styles["explorer-action"]} no-button-style`}
								onclick={(e) => clearOpenFolders(e)}
							>
								<VsCollapseAll font-size="16" />
							</button>
						</div>
					</div>
				)}
				{rootOpen() && (
					<div
						ref={explorerRef}
						onscroll={(event) => setExplorerScroll(event.target.scrollTop)}
						class={styles.explorer}
						style={{
							height: explorerHeight() ? `${explorerHeight()}px` : "auto",
							"overflow-y": "auto",
						}}
					>
						<For each={fileStore.folderContent.folders}>
							{(folder) => (
								<FolderItem
									folder={folder}
									path={`${fileStore.folderContent.root}/${folder}/`}
									indentLevel={1}
								/>
							)}
						</For>
						<For each={fileStore.folderContent.files}>
							{(file) => <FileItem file={file} indentLevel={1} />}
						</For>
						<div class={styles.spacer} />
					</div>
				)}
			</div>
		);
	};

	return (
		<div>
			<div ref={headerRef}>
				<h2>Explorer</h2>
			</div>
			{renderExplorerContent()}
		</div>
	);
};

export default Explorer;
