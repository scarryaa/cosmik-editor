import fs from "node:fs/promises";
import path, { join } from "node:path";
import { type BrowserWindow, app, clipboard, dialog, ipcMain } from "electron";
import {
	readDirectoryRecursive,
	readFile,
	readFolder,
	searchIndex,
} from "./file-operations";
import {
	parser,
	serializeNode,
	setLanguageByExtension,
	setLanguageManually,
} from "./tree-sitter/parser-utils";

const registerIpcHandlers = (mainWindow: BrowserWindow) => {
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
	1;

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
			const language = await setLanguageByExtension(extension);
			mainWindow?.webContents.send("language-set", language);
		} catch (error) {
			console.error("Error setting parser language: ", error);
			return { error: error.message };
		}
	});

	ipcMain.handle("manual-set-language-request", async (event, language) => {
		try {
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

	ipcMain.on("read-file-request", async (event, path) => {
		try {
			const data = await readFile(path);
			mainWindow?.webContents.send("file-read", { data, path });
		} catch (error) {
			console.error("Failed to read file:", error);
		}
	});

	ipcMain.on("read-folder", async (event, folderPath) => {
		try {
			const results = await readDirectoryRecursive(folderPath);
			mainWindow?.webContents.send("folder-read", results);
			return results;
		} catch (error) {
			console.error("Error reading folder:", error);
		}
	});

	ipcMain.handle("search", async (event, term) => {
		const results = searchIndex(term);
		return results;
	});

	ipcMain.handle("index", (event, folderPath) => {
		readDirectoryRecursive(folderPath).then((results) => {
			mainWindow?.webContents.send("index-result", results);
			return results;
		});
	});

	ipcMain.handle("fs-watch", async (event, filePath) => {
		const watcher = fs.watch(filePath);
		for await (const event of watcher) {
			if (event.eventType === "change") {
				const data = await readFile(filePath);
				mainWindow?.webContents.send("file-read", { data, path: filePath });
			}
		}
	});
};

export { registerIpcHandlers };
