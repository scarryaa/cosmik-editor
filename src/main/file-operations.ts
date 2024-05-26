import fs from "node:fs/promises";
import { BrowserWindow, dialog } from "electron";
import path from "node:path";
import pLimit from 'p-limit';
import lunr from "lunr";

const MAX_CONCURRENT_READS = 10;
const limit = pLimit(MAX_CONCURRENT_READS);
let documents = [];

const buildLunrIndex = () => {
    return lunr(function () {
        this.field('content');
        this.ref('path');

        for (const document of documents) {
            this.add(document);
        }
    });
};

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

const readDirectoryRecursive = async (dir, excludePatterns = []) => {
    let results = [];
    let list: any[] = [];

    try {
        list = await fs.readdir(dir, { withFileTypes: true });
    } catch (error) {
        console.error(`Error reading directory: ${dir}`, error);
        return results; // Return an empty array if there's an error reading the directory
    }

    for (let file of list) {
        const filePath = path.join(dir, file.name);

        if (file.isSymbolicLink()) {
            try {
                const realPath = await fs.realpath(filePath);
                const stat = await fs.lstat(realPath);
                if (stat.isDirectory()) {
                    continue;
                }
            } catch (error) {
                continue;
            }
        }

        if (file.isDirectory()) {
            // Skip node_modules and .git directories
            if (excludePatterns.some(pattern => file.name.match(pattern))) {
                continue;
            }
            results = results.concat(await readDirectoryRecursive(filePath, excludePatterns));
        } else if (file.isFile()) {
            // Skip files with specific extensions
            const ext = path.extname(file.name).toLowerCase();
            const skipExtensions = ['.png', '.jpeg', '.jpg', '.gif', '.bmp', '.svg', '.ico'];
            if (skipExtensions.includes(ext) || excludePatterns.some(pattern => filePath.match(pattern))) {
                continue;
            }

            results.push(limit(async () => {
                try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    // Collect document for later indexing
                    documents.push({ path: filePath, content });
                    return { path: filePath, content };
                } catch (error) {
                    console.error(`Error reading file: ${filePath}`, error);
                    return null;
                }
            }));
        }
    }

    return Promise.all(results).then(res => res.filter(Boolean));
};

const searchIndex = (term) => {
    const idx = buildLunrIndex();
    return idx.search(term).map(result => result.ref);
};

export {
	requestNewFile,
	requestSaveFile,
	requestSaveFileAs,
	openFile,
	openFolder,
	readFile,
	readFolder,
	readDirectoryRecursive,
	searchIndex,
};
