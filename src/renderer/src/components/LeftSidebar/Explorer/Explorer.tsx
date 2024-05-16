import FileItem from "@renderer/components/FileItem/FileItem";
import FolderItem from "@renderer/components/FolderItem/FolderItem";
import { VsChevronDown } from "solid-icons/vs";
import { For, createEffect, createSignal, onMount } from "solid-js";
import {
	setFileContent,
	setFolderContent,
	useFileStore,
} from "../../../stores/files";
import styles from "./Explorer.module.scss";

interface FolderResponse {
	path: string;
	files?: string[];
	folders?: string[];
}

import { onCleanup } from "solid-js";

const Explorer = () => {
	const [rootOpen, setRootOpen] = createSignal(true);
	const [explorerHeight, setExplorerHeight] = createSignal<number | null>(null);
	const fileStore = useFileStore();
	let explorerRef: HTMLDivElement | undefined;
	let headerRef: HTMLDivElement | undefined;
  
	// biome-ignore lint/suspicious/noExplicitAny: Needed here
	const api = window.api as any;
  
	createEffect(() => {
	  api.onFileOpened((_, response) => {
		setFileContent(response);
	  });
  
	  api.onFolderOpened(async (_, response: FolderResponse) => {
		if (!response || !response.files) {
		  console.error("Invalid folder response:", response);
		  return;
		}
  
		let files: string[] = [];
		let folders: string[] = [];
  
		const fullPaths = await Promise.all(
		  response.files.map(async (file) => {
			const fullPath = api.joinPath(response.path, file);
			const isDirectory = await api.isDirectory(fullPath);
			return { name: file, isDirectory };
		  })
		);
  
		for (const result of fullPaths) {
		  if (result.isDirectory) {
			folders.push(result.name);
		  } else {
			files.push(result.name);
		  }
		}
  
		setFolderContent({ root: response.path, folders, files });
		updateExplorerHeight();
	  });
	});
  
	const toggleRootOpen = () => {
	  setRootOpen(!rootOpen());
	};
  
	const updateExplorerHeight = () => {
	  if (explorerRef && headerRef) {
		const availableHeight = window.innerHeight - headerRef.clientHeight - 80; // Manual height for now
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
			  class={styles["explorer-content-header"]}
			  onclick={toggleRootOpen}
			  ref={headerRef}
			>
			  <VsChevronDown
				class={rootOpen() ? styles.rotateDown : styles.rotateRight}
			  />
			  <h3>{fileStore.folderContent.root.split("/").pop()}</h3>
			</div>
		  )}
		  {rootOpen() && (
			<div
			  ref={explorerRef}
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
					path={`${fileStore.folderContent.root}/${folder}`}
					indentLevel={1}
				  />
				)}
			  </For>
			  <For each={fileStore.folderContent.files}>
				{(file) => <FileItem file={file} indentLevel={1} />}
			  </For>
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