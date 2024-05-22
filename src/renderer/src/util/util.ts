import EditorStore from "@renderer/stores/editors";
import TabStore, { TabState } from "@renderer/stores/tabs";

export const getNumberOfLinesOnScreen = (lineHeight: number): number => {
	return Math.floor(window.innerHeight / lineHeight);
};

export const debounce = <T extends (...args: any[]) => void>(
	func: T,
	wait: number,
): T => {
	let timeout: ReturnType<typeof setTimeout>;
	return function (...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	} as T;
};

export const debounceImmediate = <T extends (...args: any[]) => void>(
	func: T,
	wait: number,
): T => {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return function (...args: Parameters<T>) {
		const callNow = !timeout;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
		}, wait);
		if (callNow) func.apply(this, args);
	} as T;
};

export const throttle = (func, wait) => {
	let timeout: any;
	return function (...args) {
		if (!timeout) {
			func.apply(this, args);
			timeout = setTimeout(() => (timeout = null), wait);
		}
	};
};

export const newFile = () => {
	TabStore.openTab({
		editorId: EditorStore.getActiveEditor()?.id!,
		id: `Untitled-${TabStore.tabs.length + 1}`,
		name: `Untitled-${TabStore.tabs.length + 1}`,
		state: TabState.Untracked,
	});
};

export const saveCurrentFile = () => {
	const filepath = TabStore.activeTab?.id;
	const fileData = EditorStore.getActiveEditor()?.getText();
	if (filepath) {
		saveFile(filepath, fileData ? fileData : "");
	}
};

export const saveFile = (filepath: string, fileData: string) => {
	window.api.sendSaveFileRequest(filepath, fileData);
};

export const saveFileAs = (filepath: string, fileData: string) => {
	window.api.sendSaveFileAsRequest(filepath, fileData);
};