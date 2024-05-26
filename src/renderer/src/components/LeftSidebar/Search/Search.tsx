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
import { VsChevronDown, VsChevronRight } from "solid-icons/vs";

const workerUrl = new URL(
	"../../../../../workers/searchWorker.ts",
	import.meta.url,
);

const SearchResult = (props: {
	result: { ref: string; matchData: { matches: Array<{ context: string }> } };
}) => {
	const [collapsed, setCollapsed] = createSignal(false);

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

	return (
		<div class={styles["search-result"]}>
			<div
				class={styles["result-ref"]}
				onKeyPress={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						setCollapsed(!collapsed());
					}
				}}
				onClick={() => setCollapsed(!collapsed())}
			>
				<div class={styles["result-ref-container"]}>
				<div class={styles["result-match-count"]}>
					{props.result.matchData.matches.length}
				</div>
					{collapsed() ? (
						<VsChevronRight
							font-size="14"
							class={styles["result-ref-chevron"]}
						/>
					) : (
						<VsChevronDown
							font-size="14"
							class={styles["result-ref-chevron"]}
						/>
					)}
					<div class={styles["result-ref-name"]}>
						{props.result.ref.split("/").pop()}
					</div>
				</div>
			</div>
			{!collapsed() ? (
				<div class={styles["result-match-data"]}>
					<For each={props.result.matchData.matches}>
						{(match) => (
							<div
								class={styles["match-context"]}
								onKeyPress={async (e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleResultClick(props.result.ref);
									}
								}}
								onClick={async () => {
									handleResultClick(props.result.ref);
								}}
								title={match.context}
							>
								{match.context}
							</div>
						)}
					</For>
				</div>
			) : null}
		</div>
	);
};

const Search: Component = () => {
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
					{(result) => <SearchResult result={result} />}
				</For>
			</div>
		</div>
	);
};

export default Search;
