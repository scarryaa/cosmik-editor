"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path$1 = require("node:path");
const utils = require("@electron-toolkit/utils");
const electron = require("electron");
const path = require("path");
const fs = require("node:fs/promises");
const Parser = require("tree-sitter");
const updateElectronApp = require("update-electron-app");
const icon = path.join(__dirname, "../../resources/icon.png");
const requestNewFile = () => {
  const focusedWindow = electron.BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.executeJavaScript(`
        window.dispatchEvent(new Event('new-file-request'));
      `);
  } else {
    console.error("No focused window found.");
  }
};
const requestSaveFile = () => {
  const focusedWindow = electron.BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.executeJavaScript(`
		window.dispatchEvent(new Event('save-file-request'));
	  `);
  } else {
    console.error("No focused window found.");
  }
};
const requestSaveFileAs = () => {
  const focusedWindow = electron.BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.executeJavaScript(`
            window.dispatchEvent(new Event('save-file-as-request'));
        `);
  } else {
    console.error("No focused window found.");
  }
};
async function openFile(mainWindow) {
  try {
    const result = await electron.dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "All Files", extensions: ["*"] }]
    });
    if (!result.canceled && result.filePaths.length > 0) {
      const path2 = result.filePaths[0];
      const data = await fs.readFile(path2, "utf-8");
      mainWindow?.webContents.send("file-opened", { data, path: path2 });
    }
  } catch (error) {
    console.error("Failed to open file:", error);
  }
}
async function openFolder(mainWindow) {
  try {
    const result = await electron.dialog.showOpenDialog({
      properties: ["openDirectory"],
      filters: [{ name: "All Files", extensions: ["*"] }]
    });
    if (!result.canceled && result.filePaths.length > 0) {
      const folderContents = await readFolder(result.filePaths[0]);
      mainWindow?.webContents.send("folder-opened", folderContents);
    }
  } catch (error) {
    console.error("Failed to open folder:", error);
  }
}
async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}
async function readFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    return { path: folderPath, files };
  } catch (error) {
    console.error(`Failed to read folder: ${error.message}`);
    throw new Error(`Failed to read folder: ${error.message}`);
  }
}
const languageModules = {
  sh: () => import("tree-sitter-bash"),
  c: () => import("tree-sitter-c"),
  cpp: () => import("tree-sitter-cpp"),
  cxx: () => import("tree-sitter-cpp"),
  cc: () => import("tree-sitter-cpp"),
  h: () => import("tree-sitter-cpp"),
  hpp: () => import("tree-sitter-cpp"),
  cs: () => import("tree-sitter-c-sharp"),
  lisp: () => import("tree-sitter-commonlisp"),
  lsp: () => import("tree-sitter-commonlisp"),
  cu: () => import("tree-sitter-cuda"),
  glsl: () => import("tree-sitter-glsl"),
  vert: () => import("tree-sitter-glsl"),
  frag: () => import("tree-sitter-glsl"),
  go: () => import("tree-sitter-go"),
  hs: () => import("tree-sitter-haskell"),
  html: () => import("tree-sitter-html"),
  htm: () => import("tree-sitter-html"),
  java: () => import("tree-sitter-java"),
  js: () => import("tree-sitter-javascript"),
  jsx: () => import("tree-sitter-javascript"),
  json: () => import("tree-sitter-json"),
  ml: () => import("tree-sitter-ocaml"),
  mli: () => import("tree-sitter-ocaml"),
  odin: () => import("tree-sitter-odin"),
  php: () => import("tree-sitter-php"),
  py: () => import("tree-sitter-python"),
  pyc: () => import("tree-sitter-python"),
  pyd: () => import("tree-sitter-python"),
  pyo: () => import("tree-sitter-python"),
  pyw: () => import("tree-sitter-python"),
  re: () => import("tree-sitter-regex"),
  rb: () => import("tree-sitter-ruby"),
  rs: () => import("tree-sitter-rust"),
  scss: () => import("tree-sitter-scss"),
  css: () => import("tree-sitter-css")
};
const parser = new Parser();
async function setLanguageByExtension(filePath) {
  const extension = filePath.split(".").pop()?.toLowerCase() ?? "";
  const typescriptModule = await import("tree-sitter-typescript");
  if (extension === "ts") {
    parser.setLanguage(typescriptModule.default.typescript);
    return extension;
  }
  if (extension === "tsx") {
    parser.setLanguage(typescriptModule.default.tsx);
    return extension;
  }
  if (languageModules[extension]) {
    const module2 = await languageModules[extension]();
    parser.setLanguage(module2.default);
    return extension;
  }
  parser.reset();
  return "plaintext";
}
async function setLanguageManually(language) {
  const normalizedLanguage = language.toLowerCase();
  if (normalizedLanguage === "typescript") {
    const module2 = (await import("tree-sitter-typescript")).default.typescript;
    parser.setLanguage(module2);
  } else if (normalizedLanguage === "tsx") {
    const module2 = (await import("tree-sitter-typescript")).default.tsx;
    parser.setLanguage(module2);
  } else if (languageModules[normalizedLanguage]) {
    const module2 = await languageModules[normalizedLanguage]();
    parser.setLanguage(module2.default);
  } else {
    console.warn(`Unsupported language: ${language}`);
    parser.reset();
  }
}
function serializeNode(node) {
  return {
    type: node.type,
    startIndex: node.startIndex,
    endIndex: node.endIndex,
    isNamed: node.isNamed,
    children: node.children.map(serializeNode),
    text: node.text ? node.text.toString() : null
  };
}
const registerIpcHandlers = (mainWindow) => {
  electron.ipcMain.handle("open-file", async () => {
    try {
      const result = await electron.dialog.showOpenDialog(mainWindow, {
        properties: ["openFile"]
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
  electron.ipcMain.handle("open-folder", async () => {
    try {
      const result = await electron.dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"]
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
  electron.ipcMain.handle("save-file", async (event, filePath, data) => {
    try {
      await fs.writeFile(filePath, data);
      return true;
    } catch (error) {
      console.error(`Failed to save file: ${filePath}`, error);
      return false;
    }
  });
  electron.ipcMain.handle("check-if-directory", async (event, fullPath) => {
    try {
      const stats = await fs.stat(fullPath);
      return stats.isDirectory();
    } catch (error) {
      console.error(
        `Failed to check if path is a directory: ${fullPath}`,
        error
      );
      return false;
    }
  });
  electron.ipcMain.handle("copy", async (event, data) => {
    try {
      await electron.clipboard.writeText(data);
      return true;
    } catch (error) {
      console.error(`Failed to copy to clipboard: ${error.message}`);
      return false;
    }
  });
  electron.ipcMain.handle("cut", async (event, data) => {
    try {
      await electron.clipboard.writeText(data);
      return true;
    } catch (error) {
      console.error(`Failed to cut: ${error.message}`);
      return false;
    }
  });
  electron.ipcMain.handle("paste", async (event) => {
    try {
      return await electron.clipboard.readText();
    } catch (error) {
      console.error(`Failed to paste: ${error.message}`);
      return false;
    }
  });
  electron.ipcMain.handle("create-folder", async (event, folderPath) => {
    try {
      await fs.mkdir(folderPath);
      return true;
    } catch (error) {
      console.error(`Failed to create folder: ${folderPath}`, error);
      return false;
    }
  });
  electron.ipcMain.handle("create-file", async (event, filePath) => {
    try {
      await fs.writeFile(filePath, "");
      return true;
    } catch (error) {
      console.error(`Failed to create file: ${filePath}`, error);
      return false;
    }
  });
  electron.ipcMain.handle("get-file-contents", async (event, filePath) => {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return data;
    } catch (error) {
      console.error(`Failed to read file contents: ${error.message}`);
      return "";
    }
  });
  electron.ipcMain.handle("get-folder-contents", async (event, folderPath) => {
    try {
      const files = await fs.readdir(folderPath);
      const fullPaths = await Promise.all(
        files.map(async (file) => {
          const fullPath = path$1.join(folderPath, file);
          const isDirectory = (await fs.stat(fullPath)).isDirectory();
          return { name: file, isDirectory, path: fullPath };
        })
      );
      const folders = fullPaths.filter((f) => f.isDirectory).map((f) => f.name);
      const filesOnly = fullPaths.filter((f) => !f.isDirectory).map((f) => f.path);
      return { folders, files: filesOnly };
    } catch (error) {
      console.error(`Failed to read folder contents: ${error.message}`);
      return { folders: [], files: [] };
    }
  });
  electron.ipcMain.on("save-file-request", async (event, filepath, fileData) => {
    if (!path$1.isAbsolute(filepath)) {
      path$1.join(electron.app.getPath("documents"), filepath);
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
  electron.ipcMain.on("save-file-as-request", async (event, filepath, fileData) => {
    let defaultPath = filepath;
    if (!path$1.isAbsolute(filepath)) {
      defaultPath = path$1.join(electron.app.getPath("documents"), filepath);
    }
    const result = await electron.dialog.showSaveDialog(mainWindow, {
      defaultPath,
      buttonLabel: "Save"
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
  electron.ipcMain.handle("set-language-request", async (event, extension) => {
    try {
      const language = await setLanguageByExtension(extension);
      mainWindow?.webContents.send("language-set", language);
    } catch (error) {
      console.error("Error setting parser language: ", error);
      return { error: error.message };
    }
  });
  electron.ipcMain.handle("manual-set-language-request", async (event, language) => {
    try {
      setLanguageManually(language);
    } catch (error) {
      console.error("Error setting language manually:", error);
      return { error: error.message };
    }
  });
  electron.ipcMain.handle("parse-request", async (event, text) => {
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
  electron.ipcMain.on("open-file-request", async () => {
    try {
      const result = await electron.dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "All Files", extensions: ["*"] }]
      });
      if (!result.canceled && result.filePaths.length > 0) {
        const path2 = result.filePaths[0];
        const data = await readFile(result.filePaths[0]);
        mainWindow?.webContents.send("file-opened", { data, path: path2 });
      }
    } catch (error) {
      console.error("Failed to open file:", error);
    }
  });
};
const checkForUpdates = () => {
  updateElectronApp.updateElectronApp();
};
const requestEditorAction = async (action, text = "") => {
  const focusedWindow = electron.BrowserWindow.getFocusedWindow();
  if (!focusedWindow) {
    console.error("No focused window found.");
    return;
  }
  const detail = { action, text };
  try {
    if (action === "copy" || action === "cut") {
      const copiedText = await focusedWindow.webContents.executeJavaScript(`
                window.dispatchEvent(new CustomEvent('request-action', { detail: ${JSON.stringify(
        detail
      )} }));
            `);
      electron.clipboard.writeText(copiedText);
    } else {
      await focusedWindow.webContents.executeJavaScript(`
                window.dispatchEvent(new CustomEvent('request-action', { detail: ${JSON.stringify(
        detail
      )} }));
            `);
    }
  } catch (error) {
    console.error(`Error executing editor action: ${error}`);
  }
};
const resetEditorLayout = () => {
  const focusedWindow = electron.BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.executeJavaScript(`
            window.dispatchEvent(new Event('reset-editor-layout'));
        `);
  } else {
    console.error("No focused window found.");
  }
};
const requestOpenView = (view) => {
  const focusedWindow = electron.BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.executeJavaScript(`
		    window.dispatchEvent(new CustomEvent('open-view', { detail: '${view}' }));
        `);
  } else {
    console.error("No focused window found.");
  }
};
const requestOpenCommandPalette = () => {
  const focusedWindow = electron.BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.executeJavaScript(`
            window.dispatchEvent(new Event('open-command-palette'));
        `);
  } else {
    console.error("No focused window found.");
  }
};
const openIssuesPage = () => {
  electron.shell.openExternal("https://github.com/scarryaa/meteor/issues");
};
const openAbout = () => {
  const result = electron.dialog.showMessageBoxSync({
    title: "About meteor",
    buttons: ["OK", "Copy"],
    type: "info",
    message: `meteor

Version: ${electron.app.getVersion()}
Electron version: ${process.versions.electron}
Node version: ${process.versions.node}`
  });
  if (result === 1) {
    electron.clipboard.writeText(
      `meteor

Version: ${electron.app.getVersion()}
Electron version: ${process.versions.electron}
Node version: ${process.versions.node}`
    );
  }
};
const template = [
  {
    label: "File",
    submenu: [
      { label: "New", accelerator: "CmdOrCtrl+N", click: requestNewFile },
      {
        label: "Open File",
        accelerator: "CmdOrCtrl+O",
        click: () => openFile(exports.mainWindow)
      },
      {
        label: "Open Folder",
        accelerator: "CmdOrCtrl+Shift+O",
        click: () => openFolder(exports.mainWindow)
      },
      { type: "separator" },
      { label: "Save", accelerator: "CmdOrCtrl+S", click: requestSaveFile },
      {
        label: "Save As",
        accelerator: "CmdOrCtrl+Shift+S",
        click: requestSaveFileAs
      },
      { type: "separator" },
      { label: "Quit", role: "quit", accelerator: "CmdOrCtrl+Q" }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        click: () => requestEditorAction("undo")
      },
      {
        label: "Redo",
        accelerator: "CmdOrCtrl+Shift+Z",
        click: () => requestEditorAction("redo")
      },
      { type: "separator" },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        click: () => requestEditorAction("cut")
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        click: () => requestEditorAction("copy")
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        click: () => requestEditorAction("paste")
      },
      { type: "separator" },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        click: () => requestEditorAction("select-all")
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Command Palette",
        accelerator: "CmdOrCtrl+Shift+P",
        click: requestOpenCommandPalette
      },
      { type: "separator" },
      {
        label: "Files",
        accelerator: "CmdOrCtrl+Shift+F",
        click: () => requestOpenView("files")
      },
      {
        label: "Search",
        accelerator: "CmdOrCtrl+Shift+S",
        click: () => requestOpenView("search")
      },
      {
        label: "Source Control",
        accelerator: "CmdOrCtrl+Shift+G",
        click: () => requestOpenView("source-control")
      },
      {
        label: "Run and Debug",
        accelerator: "CmdOrCtrl+Shift+D",
        click: () => requestOpenView("run-and-debug")
      },
      {
        label: "Extensions",
        accelerator: "CmdOrCtrl+Shift+X",
        click: () => requestOpenView("extensions")
      },
      { type: "separator" },
      {
        label: "Editor Layout",
        type: "submenu",
        submenu: [{ label: "Reset to Default", click: resetEditorLayout }]
      },
      { type: "separator" },
      {
        label: "Toggle Fullscreen",
        role: "togglefullscreen",
        accelerator: "Alt+Shift+F"
      },
      { label: "Toggle Developer Tools", role: "toggleDevTools" },
      { type: "separator" },
      { label: "Reload", role: "reload", accelerator: "None" }
    ]
  },
  {
    label: "Help",
    submenu: [
      { label: "About", click: openAbout },
      { type: "separator" },
      { label: "Check For Updates", click: checkForUpdates },
      { label: "Report An Issue", click: openIssuesPage }
    ]
  }
];
const createMenu = () => {
  const menu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(menu);
};
exports.mainWindow = null;
function createWindow() {
  exports.mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    title: "meteor",
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path$1.join(__dirname, "../preload/index.js"),
      sandbox: false,
      accessibleTitle: "meteor"
    }
  });
  registerIpcHandlers(exports.mainWindow);
  exports.mainWindow.on("ready-to-show", () => {
    exports.mainWindow?.show();
  });
  checkForUpdates();
  exports.mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env.ELECTRON_RENDERER_URL) {
    exports.mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    exports.mainWindow.loadFile(path$1.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.meteor");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  createMenu();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
