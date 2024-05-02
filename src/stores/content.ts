import { writable } from "svelte/store";

function createContentStore() {
	const { subscribe, update } = writable(new Map<string, string>());

	return {
		subscribe,
		updateContent: (id: string, content: string) => {
			update((contents) => {
				contents.set(id, content);
				return contents;
			});
		},
		removeContent: (id: string) => {
			update((contents) => {
				contents.delete(id);
				return contents;
			});
		},
		clearAll: () => {
			update((contents) => {
				contents.clear();
				return contents;
			});
		},
	};
}

export const contentStore = createContentStore();
