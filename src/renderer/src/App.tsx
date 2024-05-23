import {
	type Component,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import CommandPalette from "./components/CommandPalette/CommandPalette";
import EditorCore from "./components/EditorCore/EditorCore";
import EditorView from "./components/EditorView/EditorView";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import StatusPane from "./components/StatusPane/StatusPane";
import { Editor } from "./models/Editor";
import {
	commands,
	isOpen,
	setContentToDefaultCommands,
	setInitWithPrefix,
	setIsOpen,
} from "./stores/command-palette";
import EditorStore from "./stores/editors";
import { Languages, setSelectedLanguage } from "./stores/language-selections";
import { addPane, removePane, setPanes, togglePane } from "./stores/panes";
import TabStore from "./stores/tabs";
import {
	extensionsPane,
	filePane,
	runAndDebugPane,
	searchPane,
	sourceControlPane,
} from "./util/panes";
import { newFile, saveCurrentFile, saveFileAs } from "./util/util";

EditorStore.addEditor(new Editor("hello", "editor1"));
EditorStore.setActiveEditor("editor1");

const App: Component = () => {
	const [scrollSignal, setScrollSignal] = createSignal<boolean>(false);
	const [fakeClipboard, setFakeClipboard] = createSignal<string>("");
	let textAreaRef!: HTMLTextAreaElement;

	const handleGlobalKeyDown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === "p") {
			e.preventDefault();
			setInitWithPrefix(false);
			setContentToDefaultCommands();
			setIsOpen(true);
		} else if (e.ctrlKey && e.shiftKey && e.key === "P") {
			e.preventDefault();
			setInitWithPrefix(true);
			setContentToDefaultCommands();
			setIsOpen(true);
		} else if (e.ctrlKey && e.key === "s") {
			e.preventDefault();
			saveCurrentFile();
		} else if (e.ctrlKey && e.shiftKey && e.key === "S") {
			e.preventDefault();
			saveFileAs(
				TabStore.activeTab?.id!,
				EditorStore.getActiveEditor()?.getText()!,
			);
		}
	};

	createEffect(() => {
		window.api.onLanguageSet((_, language: string): void => {
			switch (language) {
				case "sh":
					setSelectedLanguage(Languages.Bash);
					break;
				case "c":
					setSelectedLanguage(Languages.C);
					break;
				case "cpp":
					setSelectedLanguage(Languages.CPP);
					break;
				case "csharp":
					setSelectedLanguage(Languages.CSharp);
					break;
				case "commonlisp":
					setSelectedLanguage(Languages.CommonLisp);
					break;
				case "cuda":
					setSelectedLanguage(Languages.CUDA);
					break;
				case "glsl":
					setSelectedLanguage(Languages.GLSL);
					break;
				case "go":
					setSelectedLanguage(Languages.Go);
					break;
				case "haskell":
					setSelectedLanguage(Languages.Haskell);
					break;
				case "html":
					setSelectedLanguage(Languages.HTML);
					break;
				case "java":
					setSelectedLanguage(Languages.Java);
					break;
				case "javascript":
					setSelectedLanguage(Languages.JavaScript);
					break;
				case "json":
					setSelectedLanguage(Languages.JSON);
					break;
				case "ocaml":
					setSelectedLanguage(Languages.OCaml);
					break;
				case "odin":
					setSelectedLanguage(Languages.Odin);
					break;
				case "plaintext":
					setSelectedLanguage(Languages.Plaintext);
					break;
				case "php":
					setSelectedLanguage(Languages.PHP);
					break;
				case "python":
					setSelectedLanguage(Languages.Python);
					break;
				case "regex":
					setSelectedLanguage(Languages.Regex);
					break;
				case "ruby":
					setSelectedLanguage(Languages.Ruby);
					break;
				case "rust":
					setSelectedLanguage(Languages.Rust);
					break;
				case "typescript":
					setSelectedLanguage(Languages.TypeScript);
					break;
				case "tsx":
					setSelectedLanguage(Languages.TypeScriptTSX);
					break;
				default:
					setSelectedLanguage(Languages.Plaintext);
					break;
			}
		});
	});

	onMount(() => {
		document.addEventListener("keydown", handleGlobalKeyDown);

		window.addEventListener("tabOpened", (event) => {
			const newTabId = event.detail.tabId;
			if (newTabId) {
				textAreaRef.focus();
			}
		});

		window.addEventListener("open-view", (event) => {
			switch ((event as any).detail) {
				case "files":
					return togglePane(filePane);
				case "search":
					return togglePane(searchPane);
				case "source-control":
					return togglePane(sourceControlPane);
				case "run-and-debug":
					return togglePane(runAndDebugPane);
				case "extensions":
					return togglePane(extensionsPane);
			}
		});

		window.addEventListener("request-action", (event) => {
			const { action } = (event as any).detail;
			const editor = EditorStore.getActiveEditor();

			switch (action) {
				case "cut":
					setFakeClipboard(editor!.cut());
					break;
				case "copy":
					setFakeClipboard(editor!.copy());
					break;
				case "paste":
					return editor?.paste(fakeClipboard());
				case "select-all":
					return editor?.selectAll();
			}
		});
		window.addEventListener("open-command-palette", () => {
			setInitWithPrefix(false);
			setIsOpen(true);
		});
		window.addEventListener("reset-editor-layout", () => {
			setPanes([filePane, searchPane]);
		});
		window.addEventListener("save-file-request", saveCurrentFile);
		window.addEventListener("new-file-request", newFile);
		window.addEventListener("save-file-as-request", () => {
			const filepath = TabStore.activeTab?.id;
			const fileData = EditorStore.getActiveEditor()?.getText();
			if (filepath && fileData) {
				saveFileAs(filepath, fileData);
			}
		});
	});

	onCleanup(() => {
		document.removeEventListener("keydown", handleGlobalKeyDown);
		window.removeEventListener("save-file-request", saveCurrentFile);
		window.removeEventListener("save-file-as-request", () => {
			const filepath = TabStore.activeTab?.id;
			const fileData = EditorStore.getActiveEditor()?.getText();
			if (filepath) {
				saveFileAs(filepath, fileData ? fileData : "");
			}
		});
	});

	createEffect(() => {
		if (textAreaRef && !isOpen()) {
			textAreaRef.focus();
		}
	});

	const handleClick = () => {
		if (textAreaRef) {
			textAreaRef.focus();
		}
	};

	const handleEnter = () => {
		setScrollSignal(true);
		setTimeout(() => {
			setScrollSignal(false);
		}, 0);
	};

	return (
		<div class="app-container">
			<CommandPalette
				commands={commands}
				isOpen={isOpen()}
				onClose={() => setIsOpen(false)}
			/>
			<LeftSidebar removePane={removePane} addPane={addPane} />
			{TabStore.tabs.length > 0 && (
				<EditorView
					scrollSignal={scrollSignal}
					click={handleClick}
					editor={() => EditorStore.getEditor("editor1")!}
				/>
			)}
			<EditorCore
				ensureCursorVisible={handleEnter}
				ref={textAreaRef}
				editor={() => EditorStore.getEditor("editor1")!}
				language="javascript"
			/>
			<StatusPane editor={() => EditorStore.getEditor("editor1")!} />
		</div>
	);
};

export default App;
