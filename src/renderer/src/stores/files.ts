import { createStore } from 'solid-js/store';

const [store, setStore] = createStore({
    fileContent: ''
});

export const setFileContent = (content) => {
    setStore('fileContent', content);
};

export const useFileStore = () => store;