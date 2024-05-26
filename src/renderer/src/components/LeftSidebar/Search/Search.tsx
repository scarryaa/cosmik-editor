import {
	For,
	createEffect,
	createSignal,
	onCleanup,
	type Component,
} from "solid-js";
import styles from "./Search.module.scss";
import { debounce } from "lodash";
import { useFileStore } from "@renderer/stores/files";
import TabStore, { TabState } from "@renderer/stores/tabs";
import EditorStore from "@renderer/stores/editors";

const workerUrl = new URL(
	"../../../../../workers/searchWorker.ts",
	import.meta.url,
);

const Search: Component = () => {
	const [documents, setDocuments] = createSignal<string[]>([]);
	const [searchTerm, setSearchTerm] = createSignal("");
	const [searchResults, setSearchResults] = createSignal([]);
	const fileStore = useFileStore();
	const worker = new Worker(workerUrl, { type: "module" });

	const loadAndIndexDocuments = async () => {
		for (const folder of fileStore.folderContent.folders) {
			if (
				folder === ".git" ||
				folder === "node_modules" ||
				folder === ".vscode" ||
				folder === "out" ||
				folder === "dist" ||
				folder === "build"
			) {
				continue;
			}

			window.api.index(folder);
		}
	};

	const handleSearch = debounce(async (term) => {
		if (term.length < 3 || term.trim().length === 0) {
			setSearchResults([]);
			return;
		}
		worker.postMessage({ type: "SEARCH", payload: term.trim() });
	}, 300);

	const handleResultClick = async (file: string) => {
		TabStore.openTab({
            id: file,
            name: file.split("/").pop()!,
            state: TabState.Untracked,
            editorId: EditorStore.getActiveEditorId()!,
        });
		const contents = await window.api.getFileContents(file);
		EditorStore.setEditorContent("editor1", contents);
		TabStore.updateTab(file, { content: contents });
    };

	createEffect(() => {
		handleSearch(searchTerm());
	});

	createEffect(() => {
		if (fileStore.folderContent.folders.length > 0) {
			loadAndIndexDocuments();
		}
	});

	createEffect(() => {
		window.api.onIndexResult((_, documents) => {
			setDocuments((docs) => [...docs, ...documents]);
			worker.postMessage({ type: "INDEX", payload: documents });
		});
	});

	worker.onmessage = (e) => {
		setSearchResults(e.data);
	};

	onCleanup(() => {
		worker.terminate();
	});

	return (
		<div class={styles["search-container"]}>
			<div class={styles["search-bar"]}>
				<input
					type="text"
					class={styles["search-input"]}
					placeholder="Search"
					value={searchTerm()}
					oninput={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div class={styles["search-results"]}>
				<For each={searchResults()}>
					{(result: any) => (
						<div class={styles["search-result"]}>
							<div
								class={styles["result-ref"]}
								onKeyPress={async (e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleResultClick(result.ref);
                                    }
								}}
								onClick={async () => {
									handleResultClick(result.ref);
								}}
								title={result.ref}
							>
								{result.ref}
							</div>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};

export default Search;
