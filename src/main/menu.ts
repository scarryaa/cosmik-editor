import { Menu } from "electron";
import {
	openFile,
	openFolder,
	requestNewFile,
	requestSaveFile,
	requestSaveFileAs,
} from "./file-operations";
import { checkForUpdates } from "./misc";
import {
	openAbout,
	openIssuesPage,
	requestEditorAction,
	requestOpenCommandPalette,
	requestOpenView,
	resetEditorLayout,
} from "./view-operations";

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

const createMenu = (): void => {
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
};

export { createMenu, template };
