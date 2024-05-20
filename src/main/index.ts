import fs from "node:fs/promises";
import path, { join } from "node:path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { BrowserWindow, Menu, app, autoUpdater, clipboard, dialog, ipcMain, shell } from "electron";
import electronUpdater, { type AppUpdater } from 'electron-updater';
import icon from "../../resources/icon.png?asset";

let isDev = process.env.NODE_ENV === "development";
let mainWindow: BrowserWindow | null = null;

export function getAutoUpdater(): AppUpdater {
	const { autoUpdater } = electronUpdater;
	return autoUpdater;
 }

function createWindow(): void {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: false,
		title: "meteor",
		...(process.platform === "linux" ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, "../preload/index.js"),
			sandbox: false,
			accessibleTitle: "meteor",
		},
	});

	mainWindow.on("ready-to-show", () => {
		mainWindow?.show();
	});

    if (isDev) {
		getAutoUpdater().checkForUpdates();
	} else {
		getAutoUpdater().checkForUpdatesAndNotify();
	}

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: "deny" };
	});

	if (is.dev && process.env.ELECTRON_RENDERER_URL) {
		mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
	} else {
		mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
	}
}

function createMenu(): void {
	const template: Menu = [
		{
			label: "File",
			submenu: [
				{ label: "New", accelerator: "CmdOrCtrl+N" },
				{
					label: "Open File",
					accelerator: "CmdOrCtrl+O",
					click: openFile,
				},
				{
					label: "Open Folder",
					accelerator: "CmdOrCtrl+Shift+O",
					click: openFolder,
				},
				{ type: "separator" },
				{ label: "Save", accelerator: "CmdOrCtrl+S", click: requestSaveFile },
				{
					label: "Save As",
					accelerator: "CmdOrCtrl+Shift+S",
					click: requestSaveFileAs,
				},
				{ type: "separator" },
				{ label: "Quit", role: "quit", accelerator: "CmdOrCtrl+Q" },
			],
		},
		{
			label: "Edit",
			submenu: [
				{ label: "Undo", role: "undo" },
				{ label: "Redo", role: "redo" },
				{ type: "separator" },
				{ label: "Cut", role: "cut" },
				{ label: "Copy", role: "copy" },
				{ label: "Paste", role: "paste" },
				{ type: "separator" },
				{ label: "Select All", role: "selectAll" },
			],
		},
		{
			label: "View",
			submenu: [
				{ label: "Reload", role: "reload" },
				{ type: "separator" },
				{ label: "Toggle Fullscreen", role: "togglefullscreen" },
				{ label: "Toggle Developer Tools", role: "toggleDevTools" },
				{ label: "Toggle Sidebar" },
			],
		},
		{
			label: "Help",
			submenu: [
				{ label: "About" },
				{ type: "separator" },
				{ label: "Check For Updates", click: checkForUpdates },
				{ label: "Report An Issue" },
			],
		},
	];

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

async function openFile(): Promise<void> {
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

async function openFolder(): Promise<void> {
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

const checkForUpdates = () => {
	getAutoUpdater().checkForUpdatesAndNotify();
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId("com.meteor");

	app.on("browser-window-created", (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	createWindow();
	createMenu();

	ipcMain.handle("open-file", async () => {
		try {
			const result = await dialog.showOpenDialog(mainWindow!, {
				properties: ["openFile"],
			});
			if (!result.canceled) {
				const filePath = result.filePaths[0];
				return await fs.readFile(filePath, "utf-8");
			}
			return null;
		} catch (error) {
			console.error("Failed to open file:", error);
			return { error: error.message };
		}
	});

	ipcMain.handle("open-folder", async () => {
		try {
			const result = await dialog.showOpenDialog(mainWindow!, {
				properties: ["openDirectory"],
			});
			if (!result.canceled) {
				const folderPath = result.filePaths[0];
				const folderContents = await readFolder(folderPath);
				return folderContents;
			}
			return null;
		} catch (error) {
			console.error("Failed to open folder:", error);
			return { error: error.message };
		}
	});

	ipcMain.handle("save-file", async (event, filePath, data) => {
		try {
			await fs.writeFile(filePath, data);
			return true;
		} catch (error) {
			console.error(`Failed to save file: ${filePath}`, error);
			return false;
		}
	});

	ipcMain.handle("check-if-directory", async (event, fullPath) => {
		try {
			const stats = await fs.stat(fullPath);
			return stats.isDirectory();
		} catch (error) {
			console.error(
				`Failed to check if path is a directory: ${fullPath}`,
				error,
			);
			return false;
		}
	});

	ipcMain.handle("copy", async (event, data) => {
		try {   
			await clipboard.writeText(data);
			return true;
        } catch (error) {
            console.error(`Failed to copy to clipboard: ${error.message}`);
            return false;
        }
    });

	ipcMain.handle("cut", async (event, data) => {
		try {
            await clipboard.writeText(data);
            return true;
        } catch (error) {
            console.error(`Failed to cut: ${error.message}`);
            return false;
        }
    });

	ipcMain.handle("paste", async (event) => {
		try {
            return await clipboard.readText();
        } catch (error) {
            console.error(`Failed to paste: ${error.message}`);
            return false;
        }
    });

	ipcMain.handle("create-folder", async (event, folderPath) => {
		try {
			await fs.mkdir(folderPath);
			return true;
		} catch (error) {
			console.error(`Failed to create folder: ${folderPath}`, error);
			return false;
		}
	});

	ipcMain.handle("create-file", async (event, filePath) => {
		try {
			await fs.writeFile(filePath, "");
			return true;
		} catch (error) {
			console.error(`Failed to create file: ${filePath}`, error);
			return false;
		}
	});

	ipcMain.handle("get-file-contents", async (event, filePath) => {
		try {
			const data = await fs.readFile(filePath, "utf-8");
			return data;
		} catch (error) {
			console.error(`Failed to read file contents: ${error.message}`);
			return "";
		}
	});

	ipcMain.handle("get-folder-contents", async (event, folderPath) => {
		try {
			const files = await fs.readdir(folderPath);
			const fullPaths = await Promise.all(
				files.map(async (file) => {
					const fullPath = join(folderPath, file);
					const isDirectory = (await fs.stat(fullPath)).isDirectory();
					return { name: file, isDirectory, path: fullPath };
				}),
			);
			const folders = fullPaths.filter((f) => f.isDirectory).map((f) => f.name);
			const filesOnly = fullPaths
				.filter((f) => !f.isDirectory)
				.map((f) => f.path);
			return { folders, files: filesOnly };
		} catch (error) {
			console.error(`Failed to read folder contents: ${error.message}`);
			return { folders: [], files: [] };
		}
	});

	ipcMain.on("save-file-request", async (event, filepath, fileData) => {
		let defaultPath = filepath;
		if (!path.isAbsolute(filepath)) {
			defaultPath = path.join(app.getPath("documents"), filepath);
		}

		if (filepath) {
			fs.writeFile(filepath, fileData, (err) => {
				if (err) {
					console.error("Error saving file:", err);
				} else {
					console.log("File saved successfully:", filepath);
				}
			});
		}
	});

	ipcMain.on("save-file-as-request", async (event, filepath, fileData) => {
		let defaultPath = filepath;
		if (!path.isAbsolute(filepath)) {
			defaultPath = path.join(app.getPath("documents"), filepath);
		}

		// Show save dialog
		const result = await dialog.showSaveDialog(mainWindow!, {
			defaultPath,
			buttonLabel: "Save",
		});

		if (!result.canceled && result.filePath) {
			fs.writeFile(result.filePath, fileData, (err) => {
				if (err) {
					console.error("Error saving file:", err);
				} else {
					console.log("File saved successfully:", result.filePath);
				}
			});
		}
	});

	ipcMain.on("open-file-request", async () => {
		try {
			const result = await dialog.showOpenDialog({
				properties: ["openFile"],
				filters: [{ name: "All Files", extensions: ["*"] }],
			});
			if (!result.canceled && result.filePaths.length > 0) {
				const path = result.filePaths[0];
				const data = await readFile(result.filePaths[0]);
				mainWindow?.webContents.send("file-opened", { data, path });
			}
		} catch (error) {
			console.error("Failed to open file:", error);
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
