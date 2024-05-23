import { BrowserWindow, app, clipboard, dialog, shell } from "electron";

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

export {
	requestEditorAction,
	resetEditorLayout,
	requestOpenView,
	requestOpenCommandPalette,
	openIssuesPage,
	openAbout,
};
