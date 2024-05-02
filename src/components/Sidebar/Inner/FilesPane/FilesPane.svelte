<script lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { onMount } from "svelte";
import { folder } from "../../../../stores/folder";
import FileItem from "./FileItem/FileItem.svelte";
import "./FilesPane.scss";
import type { FileItemType } from "./types";

let files: FileItemType[] = [];
let rootFolderName: string;

onMount(async () => {
	let fetchedFiles: FileItemType[] = await invoke("list_files_in_dir", {
		path: ".",
	});

	files = fetchedFiles.sort((a, b) => {
		if (a.is_folder && !b.is_folder) {
			return -1;
		}

		if (!a.is_folder && b.is_folder) {
			return 1;
		}

		return a.name.localeCompare(b.name);
	});

	folder.subscribe(async (value) => {
		rootFolderName = value;
		invoke("expand_scope", { folderPath: value });
		invoke("expand_scope", { folderPath: `${value}/.gitignore` });
		invoke("expand_scope", { folderPath: `${value}/*` });
		invoke("expand_scope", { folderPath: '**/.*' });
	});
});
</script>
  
<FileItem isRoot={true} indent={4} fileName={rootFolderName.split("/")[rootFolderName.split("/").length - 1]} isFolder={true} fullPath={rootFolderName} />