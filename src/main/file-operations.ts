import fs from "node:fs/promises";
import { BrowserWindow, dialog } from "electron";

const requestNewFile = () => {
	const focusedWindow = BrowserWindow.getFocusedWindow();
	if (focusedWindow) {
		focusedWindow.webContents.executeJavaScript(`
        window.dispatchEvent(new Event('new-file-request'));
      `);
	} else {
		console.error("No focused window found.");
	}
};

const requestSaveFile = () => {
	const focusedWindow = BrowserWindow.getFocusedWindow();
	if (focusedWindow) {
		focusedWindow.webContents.executeJavaScript(`
		window.dispatchEvent(new Event('save-file-request'));
	  `);
	} else {
		console.error("No focused window found.");
	}
};

const requestSaveFileAs = () => {
	const focusedWindow = BrowserWindow.getFocusedWindow();
	if (focusedWindow) {
		focusedWindow.webContents.executeJavaScript(`
            window.dispatchEvent(new Event('save-file-as-request'));
        `);
	} else {
		console.error("No focused window found.");
	}
};

async function openFile(mainWindow: BrowserWindow): Promise<void> {
	try {
		const result = await dialog.showOpenDialog({
			properties: ["openFile"],
			filters: [{ name: "All Files", extensions: ["*"] }],
		});
		if (!result.canceled && result.filePaths.length > 0) {
			const path = result.filePaths[0];
			const data = await fs.readFile(path, "utf-8");
			mainWindow?.webContents.send("file-opened", { data, path });
		}
	} catch (error) {
		console.error("Failed to open file:", error);
	}
}

async function openFolder(mainWindow: BrowserWindow): Promise<void> {
	try {
		const result = await dialog.showOpenDialog({
			properties: ["openDirectory"],
			filters: [{ name: "All Files", extensions: ["*"] }],
		});
		if (!result.canceled && result.filePaths.length > 0) {
			const folderContents = await readFolder(result.filePaths[0]);
			mainWindow?.webContents.send("folder-opened", folderContents);
		}
	} catch (error) {
		console.error("Failed to open folder:", error);
	}
}

async function readFile(filePath: string): Promise<string> {
	try {
		return await fs.readFile(filePath, "utf-8");
	} catch (error) {
		throw new Error(`Failed to read file: ${error.message}`);
	}
}

async function readFolder(folderPath: string): Promise<any> {
	try {
		const files = await fs.readdir(folderPath);
		return { path: folderPath, files };
	} catch (error) {
		console.error(`Failed to read folder: ${error.message}`);
		throw new Error(`Failed to read folder: ${error.message}`);
	}
}

export {
	requestNewFile,
	requestSaveFile,
	requestSaveFileAs,
	openFile,
	openFolder,
	readFile,
	readFolder,
};
