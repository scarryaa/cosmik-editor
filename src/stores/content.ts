import {
	type Invalidator,
	type Subscriber,
	type Unsubscriber,
	writable,
} from "svelte/store";
import { generateHash } from "../util/util";

export type ContentStore = {
	originalContents: Map<string, string>;
	contents: Map<string, string>;
	contentModified: Map<string, boolean>;
};

export type WritableContentStore = {
	subscribe: (
		this: void,
		run: Subscriber<ContentStore>,
		invalidate?: Invalidator<ContentStore> | undefined,
	) => Unsubscriber;
	updateOriginalContent: (id: string, content: string) => void;
	updateContent: (id: string, content: string) => void;
	removeContent: (id: string) => void;
	clearAll: () => void;
	resetModifiedFlag: (id: string) => void;
};

const createContentStore = (): WritableContentStore => {
	const { subscribe, update } = writable<ContentStore>({
		originalContents: new Map<string, string>(),
		contents: new Map<string, string>(),
		contentModified: new Map<string, boolean>(),
	});

	return {
		subscribe,
		updateOriginalContent: (id: string, content: string) => {
			update((state) => {
				state.originalContents.set(id, content);
				return { ...state };
			});
		},
		updateContent: (id: string, content: string) => {
			const updateAsyncContent = async () => {
				const contentHash = await generateHash(content);
				update((state) => {
					const originalContent = state.originalContents.get(id) || "";
					generateHash(originalContent)
						.then((originalContentHash) => {
							state.contents.set(id, content);
							state.contentModified.set(
								id,
								contentHash !== originalContentHash,
							);
							return { ...state };
						})
						.catch(console.error);
					return { ...state };
				});
			};

			updateAsyncContent().catch(console.error);
		},
		removeContent: (id: string) => {
			update((state) => {
				state.contents.delete(id);
				state.contentModified.set(id, true);
				return { ...state };
			});
		},
		clearAll: () => {
			update((state) => {
				state.contents.clear();
				state.contentModified.clear();
				return { ...state };
			});
		},
		resetModifiedFlag: (id: string) => {
			update((state) => {
				state.contentModified.set(id, false);
				return { ...state };
			});
		},
	};
};

export const contentStore = createContentStore();
