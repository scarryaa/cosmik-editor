import { createStore } from "solid-js/store";

const [store, setStore] = createStore({
	fileContent: "",
	folderContent: { root: "", folders: [], files: [] },
	selectedItems: [] as string[],
	firstSelectedIndex: null as number | null,
	lastSelectedIndex: null as number | null,
});

export const [openFolders, setOpenFolders] = createStore<string[]>(
	JSON.parse(localStorage.getItem("openFolders") || "[]"),
);

export const getFileContent = () => store.fileContent;

export const setFileContent = (content) => {
	setStore("fileContent", content);
};
export const setFolderContent = (content) => {
	setStore("folderContent", content);
};

export const setSelectedItems = (folders) => {
	setStore("selectedItems", folders);
};

export const setFirstSelectedIndex = (index) => {
	setStore("firstSelectedIndex", index);
};

export const setLastSelectedIndex = (index) => {
	setStore("lastSelectedIndex", index);
};

export const useFileStore = () => store;
