import { get } from "svelte/store";
import { fileRenameEvent } from "../reactives/events.svelte";
import {
	fileStore,
	folderCache,
	lastSelectedFilePath,
	nestingLevelSelections,
	selectedFiles,
} from "../reactives/file.svelte";
import type { IFile } from "../types/IFile";
import type { IFolder } from "../types/IFolder";
import type { ITauriFileResponse } from "../types/ITauriFileResponse";
import { tauriService } from "./tauriService";

export const fileService = {
	async openFolder(path: string) {
		return await tauriService.listFilesInDir(path);
	},

	setRootFolder(rootFolder: ITauriFileResponse, rootPath: string) {
		fileStore[0] = fileService.mapTauriFileResponseToIFolder(
			rootFolder,
			rootPath,
			true,
		);
	},

	mapTauriFileResponseToIFolder(
		response: ITauriFileResponse,
		path: string,
		isRoot = false,
	): IFolder {
		const children = response.children?.map((child) =>
			this.mapTauriFileResponseToItem(child),
		);
		const sortedChildren = this.sortFiles(children ?? []);

		return {
			name: isRoot ? path.split("/").pop() ?? "Root" : response.name,
			path: isRoot
				? this.normalizePath(path)
				: this.normalizePath(response.path),
			isRoot: isRoot,
			type: "folder",
			content: sortedChildren,
		};
	},

	mapTauriFileResponseToItem(response: ITauriFileResponse): IFolder | IFile {
		if (response.is_folder) {
			return this.mapTauriFileResponseToIFolder(response, response.name);
		}

		return {
			name: response.name,
			path: this.normalizePath(response.path),
			type: "file",
			content: "",
		};
	},

	sortFiles(files: Array<IFolder | IFile>) {
		return files.sort((a, b) => {
			// Sort folders before files
			if (a.type === "folder" && b.type !== "folder") {
				return -1;
			}

			if (a.type !== "folder" && b.type === "folder") {
				return 1;
			}

			// If both are folders or both are files, sort alphabetically
			return a.name.localeCompare(b.name);
		});
	},

	async refreshAllFiles() {
		const folderPaths = Array.from(folderCache.keys());
		for (const path of folderPaths) {
			const content = await tauriService.listFilesInDir(`${path}`);
			folderCache.set(
				`${path}`,
				this.sortFiles(
					content.map((file) => this.mapTauriFileResponseToItem(file)),
				),
			);
		}

		// Sort
		fileStore[0].content = fileStore[0].content as Array<IFolder | IFile>;
	},

	async refreshFolder(path: string) {
		let _content: Array<IFolder | IFile> | null = [];
		const files = await tauriService.listFilesInDir(`${path}/`);
		_content = files.map((file) =>
			fileService.mapTauriFileResponseToItem(file),
		);
		_content = fileService.sortFiles(_content);

		const targetFolder = fileService.findFolderFromPath(
			path,
			fileStore[0] as IFolder,
		);

		if (targetFolder) {
			targetFolder.content = _content;
		}

		// Update the cache with the newly fetched content
		folderCache.set(path, _content);
	},

	// Selection

	toggleSelectItem(path: string, isFile: boolean, nestingLevel: number) {
		if (selectedFiles.has(path)) {
			selectedFiles.delete(path);
			nestingLevelSelections.set(nestingLevel, false);
		} else {
			selectedFiles.add(path);
			nestingLevelSelections.set(nestingLevel, true);
		}

		if (isFile) {
			lastSelectedFilePath.set(path.split("/").slice(0, -1).join("/"));
		} else {
			lastSelectedFilePath.set(path);
		}
	},

	clearSelection() {
		selectedFiles.clear();
		nestingLevelSelections.clear();
	},

	// Renaming/New

	async renameFileOrFolder(
		path: string,
		newName: string,
	): Promise<IFile | IFolder | undefined> {
		// First, find the parent folder of the item to be renamed
		const parentPath = path.split("/").slice(0, -1).join("/");
		const parentFolder = this.findFolderFromPath(
			parentPath,
			fileStore[0] as IFolder,
		);

		if (!parentFolder) {
			return Promise.reject("Parent folder not found.");
		}

		// Find the item within the parent folder
		const itemIndex = parentFolder.content.findIndex(
			(item) => item.path === path,
		);
		if (itemIndex === -1) {
			return Promise.reject("File or folder to rename not found.");
		}

		const itemToRename = parentFolder.content[itemIndex];
		const newPath = `${parentPath}/${newName}`;

		// Check if a file or folder with the new name already exists
		if (this.checkIfFileOrFolderExists(newPath, fileStore[0] as IFolder)) {
			// Do nothing
			fileRenameEvent.set(null);
			return;
		}

		if (newName === "") {
			// Do nothing
			fileRenameEvent.set(null);
			return;
		}

		// Update the item's name and path
		itemToRename.name = newName;
		itemToRename.path = this.normalizePath(newPath);

		// If the item is a folder, update the paths of all child items recursively
		if (itemToRename.type === "folder") {
			const updateChildPaths = (folder: IFolder, newBasePath: string) => {
				folder.path = newBasePath;
				for (const child of folder.content) {
					if (child.type === "folder") {
						updateChildPaths(child as IFolder, `${newBasePath}/${child.name}`);
					} else {
						child.path = `${newBasePath}/${child.name}`;
					}
				}
			};
			updateChildPaths(itemToRename as IFolder, newPath);
		}

		// Rename the item on the filesystem
		await tauriService.renameFile(path, newPath);

		if (itemToRename.type === "file") {
			const folderPath = newPath.split("/").slice(0, -1).join("/");
			const targetFolder = this.findFolderFromPath(folderPath);
			if (targetFolder) {
				// Find the file in the targetFolder's content and update its path and name
				const fileIndex = targetFolder.content.findIndex(
					(item) => item.path === path,
				);
				if (fileIndex !== -1) {
					targetFolder.content[fileIndex].name = newName;
					targetFolder.content[fileIndex].path = this.normalizePath(newPath);
				}

				// Update folderCache if targetFolder is cached
				if (folderCache.has(targetFolder.path)) {
					folderCache.set(
						targetFolder.path,
						targetFolder.content as Array<IFolder | IFile>,
					);
				}
			}
		}

		// @TODO change this to just sort files?
		this.refreshAllFiles();
		fileRenameEvent.set(null);
		return Promise.resolve(itemToRename);
	},

	checkIfFileOrFolderExists(
		path: string,
		currentFolder: IFolder = fileStore[0] as IFolder,
	): boolean {
		// Check if the current folder or any file in it matches the path
		if (currentFolder.path === path) {
			return true;
		}

		// Recursively search in the content of the current folder
		if (Array.isArray(currentFolder.content)) {
			for (const item of currentFolder.content) {
				if (item.type === "folder") {
					// If the item is a folder, search its content recursively
					if (this.checkIfFileOrFolderExists(path, item)) {
						return true;
					}
				} else if (item.path === path) {
					// If the item is a file and matches the path, return true
					return true;
				}
			}
		}

		// If no match is found in the current folder or its subfolders, return false
		return false;
	},

	async removeFileInUI(path: string, name: string): Promise<void> {
		const newPath = this.normalizePath(path).split("/").slice(0, -1).join("/");
		const filePath = `${newPath}/${name}`;

		const parentFolderPath = newPath;
		const parentFolder = this.findFolderFromPath(
			parentFolderPath,
			fileStore[0] as IFolder,
		);

		if (parentFolder && Array.isArray(parentFolder.content)) {
			// Find the index of the file to be removed within the parent folder's content array
			const fileIndex = parentFolder.content.findIndex(
				(item) => item.path === filePath,
			);
			if (fileIndex !== -1) {
				// Remove the file from the parent folder's content array
				parentFolder.content.splice(fileIndex, 1);
				folderCache.set(parentFolder.path, parentFolder.content);
			} else {
				console.error("File not found for path:", filePath);
			}
		} else {
			console.error("Parent folder not found for path:", parentFolderPath);
		}

		// Remove the file from the file system
		await tauriService.deleteFile(filePath);

		return Promise.resolve();
	},

	async removeFolderInUI(path: string): Promise<void> {
		const newPath = this.normalizePath(path);
		const folderPath = `${newPath}`;

		const parentFolderPath = newPath.split("/").slice(0, -1).join("/");
		const parentFolder = this.findFolderFromPath(
			parentFolderPath,
			fileStore[0] as IFolder,
		);

		if (parentFolder && Array.isArray(parentFolder.content)) {
			// Find the index of the folder to be removed within the parent folder's content array
			const folderIndex = parentFolder.content.findIndex(
				(item) => item.path === folderPath,
			);
			if (folderIndex !== -1) {
				// Remove the folder from the parent folder's content array
				parentFolder.content.splice(folderIndex, 1);
				folderCache.set(parentFolder.path, parentFolder.content);
			} else {
				console.error("Folder not found for path:", folderPath);
			}
		} else {
			console.error("Parent folder not found for path:", parentFolderPath);
		}

		// Remove the folder from the file system
		await tauriService.deleteFolder(folderPath);

		return Promise.resolve();
	},

	async createNewFileInUI(path: string, name: string): Promise<IFile> {
		const newPath = this.normalizePath(path);
		const newFile: IFile = {
			type: "file",
			name,
			path: `${newPath}/${name}`,
			content: "",
		};

		// Check if file already exists
		if (this.checkIfFileOrFolderExists(newFile.path, fileStore[0] as IFolder)) {
			// @TODO notify UI
			return Promise.reject("File already exists.");
		}

		const targetFolder = this.findFolderFromPath(
			newFile.path.split("/").slice(0, -1).join("/"),
			fileStore[0] as IFolder,
		);

		if (targetFolder && Array.isArray(targetFolder.content)) {
			// If there is a selection and it is a file, prepend the new file to the folder
			// Otherwise, append the new file to the folder
			if (
				selectedFiles.has(get(lastSelectedFilePath) ?? "") &&
				get(lastSelectedFilePath) === newFile.path
			) {
				targetFolder.content.unshift(newFile);
			} else {
				targetFolder.content.push(newFile);
			}
			folderCache.set(targetFolder.path, targetFolder.content);
		} else {
			return Promise.reject(`Target folder not found for path: ${newPath}`);
		}

		// Create the file in the file system
		await tauriService.createNewFile(newFile.path);

		return Promise.resolve(newFile);
	},

	async createNewFolderInUI(path: string, name: string): Promise<IFolder> {
		const newPath = this.normalizePath(path);
		const newFolder: IFolder = {
			type: "folder",
			name,
			path: `${newPath}/${name}`,
			content: [],
			isRoot: false,
		};

		// Check if folder already exists
		if (
			this.checkIfFileOrFolderExists(newFolder.path, fileStore[0] as IFolder)
		) {
			// @TODO notify UI
			return Promise.reject("Folder already exists.");
		}

		const targetFolder = this.findFolderFromPath(
			newFolder.path.split("/").slice(0, -1).join("/"),
			fileStore[0] as IFolder,
		);

		if (targetFolder && Array.isArray(targetFolder.content)) {
			targetFolder.content.unshift(newFolder);
			folderCache.set(targetFolder.path, targetFolder.content);
		} else {
			console.error("Target folder not found for path:", newPath);
		}

		// Create the folder in the file system
		await tauriService.createNewFolder(newFolder.path);

		return Promise.resolve(newFolder);
	},

	findFolderFromPath(
		path: string,
		currentFolder: IFolder | null = fileStore[0] as IFolder | null,
	): IFolder | null {
		if (currentFolder && currentFolder.path === path) {
			return currentFolder;
		}

		if (currentFolder && Array.isArray(currentFolder.content)) {
			for (const item of currentFolder.content) {
				if (item.type === "folder") {
					const foundFolder = this.findFolderFromPath(path, item as IFolder);
					if (foundFolder) {
						return foundFolder;
					}
				}
			}
		}

		return null;
	},

	findFileFromPath(
		path: string,
		currentFolder: IFolder | null = fileStore[0] as IFolder | null,
	): IFile | null {
		// Check if the current folder is the one we're looking for
		if (currentFolder) {
			for (const item of currentFolder.content) {
				// If the item is a file, check if its path matches the target path
				if (item.type === "file" && item.path === path) {
					return item as IFile;
				}

				// If the item is a folder, recurse into it to continue the search
				if (item.type === "folder") {
					const foundFile = this.findFileFromPath(path, item as IFolder);
					if (foundFile) {
						return foundFile;
					}
				}
			}
		}

		// If the file isn't found in the current folder or any of its subfolders, return null
		return null;
	},

	normalizePath(path: string) {
		if (path.endsWith("/")) {
			return path.slice(0, -1);
		}

		return path;
	},
};