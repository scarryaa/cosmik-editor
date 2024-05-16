import fs from "node:fs/promises"; // Use fs/promises for promise-based APIs
import { join } from "node:path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { BrowserWindow, Menu, app, dialog, ipcMain, shell } from "electron";
import icon from "../../resources/icon.png?asset";

let mainWindow: BrowserWindow | null = null;

async function listFiles(dirPath: string): Promise<string[]> {
	try {
		console.log(`Listing files in directory: ${dirPath}`);
		const files = await fs.readdir(dirPath, { withFileTypes: true });
		if (!files) {
			throw new Error("No files found or failed to read directory");
		}
		return files.filter((file) => file.isFile()).map((file) => file.name);
	} catch (error) {
		console.error(`Failed to list files in directory ${dirPath}:`, error);
		throw new Error(`Failed to list files: ${error.message}`);
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
		throw new Error(`Failed to read folder: ${error.message}`);
	}
}

function createWindow(): void {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: false,
		...(process.platform === "linux" ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, "../preload/index.js"),
			sandbox: false,
		},
	});

	mainWindow.on("ready-to-show", () => {
		mainWindow?.show();
	});

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
				{ label: "Save", accelerator: "CmdOrCtrl+S" },
				{ label: "Save As", accelerator: "CmdOrCtrl+Shift+S" },
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
				{ label: "Check For Updates" },
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
			const data = await readFile(result.filePaths[0]);
			mainWindow?.webContents.send("file-opened", data);
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
			console.log(folderContents);
			mainWindow?.webContents.send("folder-opened", folderContents);
		}
	} catch (error) {
		console.error("Failed to open folder:", error);
	}
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

	ipcMain.handle("get-folder-contents", async (event, folderPath) => {
		try {
		  const files = await fs.readdir(folderPath);
		  const fullPaths = await Promise.all(
			files.map(async file => {
			  const fullPath = join(folderPath, file);
			  const isDirectory = (await fs.stat(fullPath)).isDirectory();
			  return { name: file, isDirectory };
			})
		  );
		  const folders = fullPaths.filter(f => f.isDirectory).map(f => f.name);
		  const filesOnly = fullPaths.filter(f => !f.isDirectory).map(f => f.name);
		  return { folders, files: filesOnly };
		} catch (error) {
		  console.error(`Failed to read folder contents: ${error.message}`);
		  return { folders: [], files: [] };
		}
	  });
	  
});

ipcMain.handle("is-directory", async (event, fullPath) => {
	try {
		const stats = await fs.stat(fullPath);
		return stats.isDirectory();
	} catch (error) {
		console.error(`Failed to check if path is a directory: ${fullPath}`, error);
		return false;
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
