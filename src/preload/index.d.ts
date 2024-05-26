import type { ElectronAPI } from "@electron-toolkit/preload";

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			search: (term: string) => string[];
			onFileOpened: (callback: (event: any, data: any) => void) => void;
			onFileRead: (callback: (event: any, data: any) => void) => void;
			onFolderOpened: (callback: (event: any, data: any) => void) => void;
			onFileChanged: (callback: (event: any, data: any) => void) => void;
			onFolderRead: (callback: (event: any, data: any) => void) => void;
			index: (folderPath: string) => void;
			onIndexResult: (callback: (event: any, data: any) => void) => void;
			fsWatch: (filePath) => void;
			joinPath: (...args: string[]) => string;
			relativePath: (...args: string[]) => string;
			isDirectory: (fullPath: string) => boolean;
			getFolderContents: (folderPath: string) => string[];
			createFolder: (folderPath: string) => void;
			createFile: (filePath: string) => void;
			getFileContents: (filePath: string) => string;
			saveFile: (filePath: string, data: string) => void;
			sendSaveFileRequest: (filepath: string, fileData: string) => void;
			sendNewFileRequest: () => void;
			sendSaveFileAsRequest: (filepath: string, fileData: string) => void;
			sendOpenFileRequest: () => void;
			copy: (text: string) => void;
			paste: () => string;
			sendCutOrCopiedText: (text) => void;
			parseRequest: (text: string) => string;
			onParseResult: (callback: (event: any, data: any) => void) => void;
			setLanguageRequest: (extension: string) => void;
			onLanguageSet: (callback: (event: any, data: any) => void) => void;
			manualSetLanguageRequest: (language: string) => void;
			sendReadFileRequest: (path: string) => string;
			sendFolderReadRequest: (path: string) => string[];
		};
	}
}
