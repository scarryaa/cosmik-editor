import { createStore } from "solid-js/store";

const [store, setStore] = createStore({
	fileContent: "",
	folderContent: { root: "", folders: [], files: [] },
});

export const [openFolders, setOpenFolders] = createStore<string[]>(JSON.parse(localStorage.getItem("openFolders") || "[]"));

export const setFileContent = (content) => {
	setStore("fileContent", content);
};
export const setFolderContent = (content) => {
	setStore("folderContent", content);
};

export const useFileStore = () => store;
