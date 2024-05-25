"use strict";
const path = require("node:path");
const preload = require("@electron-toolkit/preload");
const electron = require("electron");
const api = {
  onFileOpened: (callback) => electron.ipcRenderer.on("file-opened", callback),
  onFolderOpened: (callback) => electron.ipcRenderer.on("folder-opened", callback),
  joinPath: (...args) => path.join(...args),
  isDirectory: (fullPath) => electron.ipcRenderer.invoke("check-if-directory", fullPath),
  getFolderContents: (folderPath) => electron.ipcRenderer.invoke("get-folder-contents", folderPath),
  createFolder: (folderPath) => electron.ipcRenderer.invoke("create-folder", folderPath),
  createFile: (filePath) => electron.ipcRenderer.invoke("create-file", filePath),
  getFileContents: (filePath) => electron.ipcRenderer.invoke("get-file-contents", filePath),
  saveFile: (filePath, data) => electron.ipcRenderer.invoke("save-file", filePath, data),
  sendSaveFileRequest: (filepath, fileData) => {
    electron.ipcRenderer.send("save-file-request", filepath, fileData);
  },
  sendNewFileRequest: () => {
    electron.ipcRenderer.send("new-file-request");
  },
  sendSaveFileAsRequest: (filepath, fileData) => {
    electron.ipcRenderer.send("save-file-as-request", filepath, fileData);
  },
  sendOpenFileRequest: () => {
    electron.ipcRenderer.send("open-file-request");
  },
  copy: (text) => electron.ipcRenderer.invoke("copy", text),
  paste: () => electron.ipcRenderer.invoke("paste"),
  sendCutOrCopiedText: (text) => electron.ipcRenderer.send("copied-or-cut-text", text),
  parseRequest: (text) => electron.ipcRenderer.invoke("parse-request", text),
  onParseResult: (callback) => electron.ipcRenderer.on("parse-result", callback),
  setLanguageRequest: (extension) => electron.ipcRenderer.invoke("set-language-request", extension),
  onLanguageSet: (callback) => electron.ipcRenderer.on("language-set", callback),
  manualSetLanguageRequest: (language) => electron.ipcRenderer.invoke("manual-set-language-request", language)
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
    electron.contextBridge.exposeInMainWorld("path", {
      join: (...args) => path.join(...args)
    });
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
