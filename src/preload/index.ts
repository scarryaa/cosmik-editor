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
	sendNewFileRequest: () => {
		ipcRenderer.send("new-file-request");
	},
	sendSaveFileAsRequest: (filepath: string, fileData: string) => {
		ipcRenderer.send("save-file-as-request", filepath, fileData);
	},
	sendOpenFileRequest: () => {
		ipcRenderer.send("open-file-request");
	},
	copy: (text: string) => ipcRenderer.invoke("copy", text),
	paste: () => ipcRenderer.invoke("paste"),
	sendCutOrCopiedText: (text) => ipcRenderer.send("copied-or-cut-text", text),
	parseRequest: (text: string) => ipcRenderer.invoke("parse-request", text),
	onParseResult: (callback: (event: any, data: any) => void) =>
		ipcRenderer.on("parse-result", callback),
	setLanguageRequest: (extension: string) =>
		ipcRenderer.invoke("set-language-request", extension),
	onLanguageSet: (callback: (event: any, data: any) => void) =>
		ipcRenderer.on("language-set", callback),
	manualSetLanguageRequest: (language: string) =>
		ipcRenderer.invoke("manual-set-language-request", language),
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
