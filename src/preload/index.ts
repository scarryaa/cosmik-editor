import path from "node:path";
import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

const api = {
	onFileOpened: (callback: (event: any, data: any) => void) =>
		ipcRenderer.on("file-opened", callback),
	onFolderOpened: (callback: (event: any, data: any) => void) =>
		ipcRenderer.on("folder-opened", callback),
	joinPath: (...args: string[]) => path.join(...args),
	isDirectory: (fullPath: string) =>
		ipcRenderer.invoke("check-if-directory", fullPath),
	getFolderContents: (folderPath: string) =>
		ipcRenderer.invoke("get-folder-contents", folderPath),
	createFolder: (folderPath: string) =>
		ipcRenderer.invoke("create-folder", folderPath),
	createFile: (filePath: string) => ipcRenderer.invoke("create-file", filePath),
	getFileContents: (filePath: string) =>
		ipcRenderer.invoke("get-file-contents", filePath),
	saveFile: (filePath: string, data: string) =>
		ipcRenderer.invoke("save-file", filePath, data),
	sendSaveFileRequest: (filepath: string, fileData: string) => {
		ipcRenderer.send("save-file-request", filepath, fileData);
	},
	sendSaveFileAsRequest: (filepath: string, fileData: string) => {
		ipcRenderer.send("save-file-as-request", filepath, fileData);
	},
	sendOpenFileRequest: () => {
		ipcRenderer.send("open-file-request");
	},
};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", api);
		contextBridge.exposeInMainWorld("path", {
			join: (...args: string[]) => path.join(...args),
		});
	} catch (error) {
		console.error(error);
	}
} else {
	window.electron = electronAPI;
	window.api = api;
}
