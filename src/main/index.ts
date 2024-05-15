import fs from "node:fs";
import { join } from "node:path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { BrowserWindow, Menu, app, dialog, ipcMain, shell } from "electron";
import icon from "../../resources/icon.png?asset";

let mainWindow: BrowserWindow | null = null; 

function listFiles(dirPath) {
	return new Promise((resolve, reject) => {
		fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
			if (err) {
				reject(err);
				return;
			}
			// Filter directories and map files to their names
			const fileList = files
				.filter((file) => file.isFile())
				.map((file) => file.name);
			resolve(fileList);
		});
	});
}

function createWindow(): void {
	// Create the browser window.
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

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env.ELECTRON_RENDERER_URL) {
		mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
	} else {
		mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId("com.electron");

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on("browser-window-created", (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	// IPC test
	ipcMain.on("ping", () => console.log("pong"));
	ipcMain.on("list-files", async (event, dirPath) => {
		try {
			const files = await listFiles(dirPath);
			event.reply("list-files-reply", files);
		} catch (error) {
			console.error("Failed to list files:", error);
			event.reply("list-files-reply", { error: error.message });
		}
	});

	createMenu();
	createWindow();

	ipcMain.handle('open-file', async (event) => {
		const result = await dialog.showOpenDialog(mainWindow!, {
		  properties: ['openFile'] 
		});
		if (!result.canceled) {
		  const filePath = result.filePaths[0];
		  return fs.readFileSync(filePath, 'utf-8');
		}
		return null;
	  });

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
		if (Menu.getApplicationMenu() === null) {
			createMenu();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

const openFile = () => {
	dialog.showOpenDialog({
	  properties: ['openFile'],
	  filters: [
		{ name: 'All Files', extensions: ['*'] }
	  ]
	}).then(result => {
	  if (!result.canceled) {
		readFile(result.filePaths[0]);
	  }
	}).catch(err => {
	  console.error('Failed to open file:', err);
	});
  };
  
  const readFile = (filePath) => {
	fs.readFile(filePath, 'utf-8', (err, data) => {
	  if (err) {
		console.error('Failed to read file:', err);
		return;
	  }

	  mainWindow?.webContents.send('file-opened', data);
	});
  };
  

const createMenu = () => {
	const template: Menu = [
		{
			label: "File",
			submenu: [
				{ label: "New", accelerator: "CmdOrCtrl+N" },
				{
					label: "Open File",
					accelerator: "CmdOrCtrl+O",
					click: () => {
						openFile();
					},
				},
				{ label: "Open Folder", accelerator: "CmdOrCtrl+Shift+O" },
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
};
