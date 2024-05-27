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
import { searchStore, setSearchStore } from "@renderer/stores/search";
import Tooltip from "@renderer/components/Tooltip/Tooltip";

const workerUrl = new URL(
	"../../../../../workers/searchWorker.ts",
	import.meta.url,
);

const SearchResult = (props: {
	result: {
		ref: string;
		matchData: { matches: Array<{ context: string; index: number }> };
	};
}) => {
	const [collapsed, setCollapsed] = createSignal(false);

	const handleResultClick = async (file: string, globalIndex: number) => {
		TabStore.openTab({
			id: file,
			name: file.split("/").pop()!,
			state: TabState.Untracked,
			editorId: EditorStore.getActiveEditorId()!,
		});
		const contents = await window.api.getFileContents(file);
		EditorStore.setEditorContent("editor1", contents);
		TabStore.updateTab(file, { content: contents });
		const { line, column } =
			await EditorStore.getActiveEditor()!.calculateLocalIndex(globalIndex);
		EditorStore.getActiveEditor()?.moveTo(column, line, 0);
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
							<Tooltip content={match.context} position="right" showDelay={500}>
								<div
									class={styles["match-context"]}
									onKeyPress={async (e) => {
										if (e.key === "Enter" || e.key === " ") {
											handleResultClick(props.result.ref, match.index);
										}
									}}
									onClick={async () => {
										handleResultClick(props.result.ref, match.index);
									}}
								>
									{match.context}
								</div>
							</Tooltip>
						)}
					</For>
				</div>
			) : null}
		</div>
	);
};

const Search: Component = () => {
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
		if (term.trim().length === 0) {
			setSearchStore({ searchResults: [], searchPerformed: false });
			return;
		}
		worker.postMessage({ type: "SEARCH", payload: term.trim() });
	}, 300);

	createEffect(() => {
		if (searchStore.searchTerm.trim().length > 0) {
			handleSearch(searchStore.searchTerm);
		}
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
		setSearchStore({
			searchResults: e.data,
			searchPerformed: true,
		});
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
					value={searchStore.searchTerm}
					oninput={(e) => setSearchStore({ searchTerm: e.target.value })}
				/>
			</div>
			<div class={styles["search-results"]}>
				{searchStore.searchPerformed &&
					searchStore.searchResults.length === 0 && (
						<div class={styles["no-results"]}>No results found</div>
					)}
				<For each={searchStore.searchResults}>
					{(result) => <SearchResult result={result} />}
				</For>
			</div>
		</div>
	);
};

export default Search;
