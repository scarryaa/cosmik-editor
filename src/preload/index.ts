import path from "node:path";
import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

const api = {
	onFileOpened: (callback) => ipcRenderer.on("file-opened", callback),
	onFolderOpened: (callback) => ipcRenderer.on("folder-opened", callback),
	joinPath: (...args) => path.join(...args),
	isDirectory: (fullPath) => ipcRenderer.invoke("check-if-directory", fullPath),
	getFolderContents: (folderPath) => ipcRenderer.invoke("get-folder-contents", folderPath),
	createFolder: (folderPath) => ipcRenderer.invoke("create-folder", folderPath),
	createFile: (filePath) => ipcRenderer.invoke("create-file", filePath),
};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", api);
		contextBridge.exposeInMainWorld("path", {
			join: (...args) => path.join(...args),
		});
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}
