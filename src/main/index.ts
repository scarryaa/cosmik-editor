import fs from "node:fs/promises";
import path, { join } from "node:path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import {
	BrowserWindow,
	Menu,
	app,
	clipboard,
	dialog,
	ipcMain,
	shell,
} from "electron";
import { updateElectronApp } from "update-electron-app";
import icon from "../../resources/icon.png?asset";
import {
	parser,
	serializeNode,
	setLanguageByExtension,
	setLanguageManually,
} from "./tree-sitter/parser-utils";

let mainWindow: BrowserWindow | null = null;

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

	checkForUpdates();
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
				{ label: "New", accelerator: "CmdOrCtrl+N", click: requestNewFile },
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
				{
					label: "Undo",
					accelerator: "CmdOrCtrl+Z",
					click: () => requestEditorAction("undo"),
				},
				{
					label: "Redo",
					accelerator: "CmdOrCtrl+Shift+Z",
					click: () => requestEditorAction("redo"),
				},
				{ type: "separator" },
				{
					label: "Cut",
					accelerator: "CmdOrCtrl+X",
					click: () => requestEditorAction("cut"),
				},
				{
					label: "Copy",
					accelerator: "CmdOrCtrl+C",
					click: () => requestEditorAction("copy"),
				},
				{
					label: "Paste",
					accelerator: "CmdOrCtrl+V",
					click: () => requestEditorAction("paste"),
				},
				{ type: "separator" },
				{
					label: "Select All",
					accelerator: "CmdOrCtrl+A",
					click: () => requestEditorAction("select-all"),
				},
			],
		},
		{
			label: "View",
			submenu: [
				{
					label: "Command Palette",
					accelerator: "CmdOrCtrl+Shift+P",
					click: requestOpenCommandPalette,
				},
				{ type: "separator" },
				{
					label: "Files",
					accelerator: "CmdOrCtrl+Shift+F",
					click: () => requestOpenView("files"),
				},
				{
					label: "Search",
					accelerator: "CmdOrCtrl+Shift+S",
					click: () => requestOpenView("search"),
				},
				{
					label: "Source Control",
					accelerator: "CmdOrCtrl+Shift+G",
					click: () => requestOpenView("source-control"),
				},
				{
					label: "Run and Debug",
					accelerator: "CmdOrCtrl+Shift+D",
					click: () => requestOpenView("run-and-debug"),
				},
				{
					label: "Extensions",
					accelerator: "CmdOrCtrl+Shift+X",
					click: () => requestOpenView("extensions"),
				},
				{ type: "separator" },
				{
					label: "Editor Layout",
					type: "submenu",
					submenu: [{ label: "Reset to Default", click: resetEditorLayout }],
				},
				{ type: "separator" },
				{
					label: "Toggle Fullscreen",
					role: "togglefullscreen",
					accelerator: "Alt+Shift+F",
				},
				{ label: "Toggle Developer Tools", role: "toggleDevTools" },
				{ type: "separator" },
				{ label: "Reload", role: "reload", accelerator: "None" },
			],
		},
		{
			label: "Help",
			submenu: [
				{ label: "About", click: openAbout },
				{ type: "separator" },
				{ label: "Check For Updates", click: checkForUpdates },
				{ label: "Report An Issue", click: openIssuesPage },
			],
		},
	];

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

const requestEditorAction = async (action, text = "") => {
	const focusedWindow = BrowserWindow.getFocusedWindow();
	if (!focusedWindow) {
		console.error("No focused window found.");
		return;
	}

	const detail = { action, text };

	try {
		if (action === "copy" || action === "cut") {
			const copiedText = await focusedWindow.webContents.executeJavaScript(`
                window.dispatchEvent(new CustomEvent('request-action', { detail: ${JSON.stringify(
									detail,
								)} }));
            `);
			clipboard.writeText(copiedText);
		} else {
			// (paste, select-all, etc.)
			await focusedWindow.webContents.executeJavaScript(`
                window.dispatchEvent(new CustomEvent('request-action', { detail: ${JSON.stringify(
									detail,
								)} }));
            `);
		}
	} catch (error) {
		console.error(`Error executing editor action: ${error}`);
	}
};

const resetEditorLayout = (): void => {
	const focusedWindow = BrowserWindow.getFocusedWindow();
	if (focusedWindow) {
		focusedWindow.webContents.executeJavaScript(`
            window.dispatchEvent(new Event('reset-editor-layout'));
        `);
	} else {
		console.error("No focused window found.");
	}
};

const requestOpenView = (
	view: "files" | "search" | "source-control" | "run-and-debug" | "extensions",
): void => {
	const focusedWindow = BrowserWindow.getFocusedWindow();
	if (focusedWindow) {
		focusedWindow.webContents.executeJavaScript(`
		    window.dispatchEvent(new CustomEvent('open-view', { detail: '${view}' }));
        `);
	} else {
		console.error("No focused window found.");
	}
};

const requestOpenCommandPalette = (): void => {
	const focusedWindow = BrowserWindow.getFocusedWindow();
	if (focusedWindow) {
		focusedWindow.webContents.executeJavaScript(`
            window.dispatchEvent(new Event('open-command-palette'));
        `);
	} else {
		console.error("No focused window found.");
	}
};

const openIssuesPage = (): void => {
	shell.openExternal("https://github.com/scarryaa/meteor/issues");
};

const openAbout = (): void => {
	const result = dialog.showMessageBoxSync({
		title: "About meteor",
		buttons: ["OK", "Copy"],
		type: "info",
		message: `meteor\n\nVersion: ${app.getVersion()}\nElectron version: ${
			process.versions.electron
		}\nNode version: ${process.versions.node}`,
	});
	if (result === 1) {
		clipboard.writeText(
			`meteor\n\nVersion: ${app.getVersion()}\nElectron version: ${
				process.versions.electron
			}\nNode version: ${process.versions.node}`,
		);
	}
};

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

const checkForUpdates = () => {
	updateElectronApp();
};

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
					console.info("File saved successfully:", filepath);
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
					console.info("File saved successfully:", result.filePath);
				}
			});
		}
	});

	ipcMain.handle("set-language-request", async (event, extension) => {
		try {
			const language = setLanguageByExtension(extension);
			mainWindow?.webContents.send("language-set", language);
		} catch (error) {
			console.error("Error setting parser language: ", error);
			return { error: error.message };
		}
	});

	ipcMain.handle("manual-set-language-request", async (event, language) => {
		try {
			console.log(language);
			setLanguageManually(language);
		} catch (error) {
			console.error("Error setting language manually:", error);
			return { error: error.message };
		}
	});

	ipcMain.handle("parse-request", async (event, text) => {
		try {
			const tree = parser.parse(text);
			if (!tree || !tree.rootNode) {
				console.error("Tree or root node is undefined");
				return { error: "Tree or root node is undefined" };
			}

			const serializedTree = serializeNode(tree.rootNode);
			event.sender.send("parse-result", JSON.stringify(serializedTree));
		} catch (error) {
			console.error("Error parsing text:", error);
			return { error: error.message };
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
