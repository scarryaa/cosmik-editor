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

const handleLanguageSet = (language: string): void => {
	const languageMap: { [key: string]: Languages } = {
		sh: Languages.Bash,
		c: Languages.C,
		cpp: Languages.CPP,
		cxx: Languages.CPP,
		cc: Languages.CPP,
		h: Languages.CPP,
		hpp: Languages.CPP,
		cs: Languages.CSharp,
		css: Languages.CSS,
		lisp: Languages.CommonLisp,
		lsp: Languages.CommonLisp,
		cu: Languages.CUDA,
		glsl: Languages.GLSL,
		vert: Languages.GLSL,
		frag: Languages.GLSL,
		go: Languages.Go,
		hs: Languages.Haskell,
		html: Languages.HTML,
		htm: Languages.HTML,
		java: Languages.Java,
		js: Languages.JavaScript,
		jsx: Languages.JavaScript,
		json: Languages.JSON,
		ml: Languages.OCaml,
		mli: Languages.OCaml,
		odin: Languages.Odin,
		txt: Languages.Plaintext,
		md: Languages.Plaintext,
		php: Languages.PHP,
		py: Languages.Python,
		pyc: Languages.Python,
		pyd: Languages.Python,
		pyo: Languages.Python,
		pyw: Languages.Python,
		re: Languages.Regex,
		rb: Languages.Ruby,
		rs: Languages.Rust,
		scss: Languages.SCSS,
		ts: Languages.TypeScript,
		tsx: Languages.TypeScriptTSX,
	};

	setSelectedLanguage(languageMap[language] || Languages.Plaintext);
};

// Event handlers
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

const handleOpenView = (event: Event) => {
	switch ((event as CustomEvent).detail) {
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
};

const handleSaveFileAsRequest = () => {
	const filepath = TabStore.activeTab?.id;
	const fileData = EditorStore.getActiveEditor()?.getText();
	if (filepath && fileData) {
		saveFileAs(filepath, fileData);
	}
};

const App: Component = () => {
	const handleRequestAction = (event: Event) => {
		const { action } = (event as CustomEvent).detail;
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
	};

	const [scrollSignal, setScrollSignal] = createSignal<boolean>(false);
	const [fakeClipboard, setFakeClipboard] = createSignal<string>("");
	let textAreaRef!: HTMLTextAreaElement;

	// Lifecycle hooks
	onMount(() => {
		document.addEventListener("keydown", handleGlobalKeyDown);
		window.addEventListener("tabOpened", (event) => {
			const newTabId = (event as CustomEvent).detail.tabId;
			if (newTabId) {
				textAreaRef.focus();
			}
		});
		window.addEventListener("open-view", handleOpenView);
		window.addEventListener("request-action", handleRequestAction);
		window.addEventListener("open-command-palette", () => {
			setInitWithPrefix(false);
			setIsOpen(true);
		});
		window.addEventListener("reset-editor-layout", () => {
			setPanes([filePane, searchPane]);
		});
		window.addEventListener("save-file-request", saveCurrentFile);
		window.addEventListener("new-file-request", newFile);
		window.addEventListener("save-file-as-request", handleSaveFileAsRequest);
		window.api.onLanguageSet((_, language: string) => handleLanguageSet(language));
	});

	onCleanup(() => {
		document.removeEventListener("keydown", handleGlobalKeyDown);
		window.removeEventListener("open-view", handleOpenView);
		window.removeEventListener("request-action", handleRequestAction);
		window.removeEventListener("save-file-as-request", handleSaveFileAsRequest);
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
