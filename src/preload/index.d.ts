import type { ElectronAPI } from "@electron-toolkit/preload";

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			onFileOpened: (callback: (event: any, data: any) => void) => void;
			onFolderOpened: (callback: (event: any, data: any) => void) => void;
			joinPath: (...args: string[]) => string;
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
		};
	}
}
