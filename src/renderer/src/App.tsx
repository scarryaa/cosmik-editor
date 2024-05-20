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
import { isOpen, setInitWithPrefix, setIsOpen } from "./stores/command-palette";
import EditorStore from "./stores/editors";
import { panes, setPanes } from "./stores/panes";
import TabStore from "./stores/tabs";
import {
	extensionsPane,
	filePane,
	runAndDebugPane,
	searchPane,
	sourceControlPane,
} from "./util/panes";

EditorStore.addEditor(new Editor("", "editor1"));
EditorStore.setActiveEditor("editor1");

const App: Component = () => {
	const [scrollSignal, setScrollSignal] = createSignal<boolean>(false);
	let textAreaRef!: HTMLTextAreaElement;

	const commands = [
		{
			id: 1,
			label: "File: Open File",
			action: () => window.api.sendOpenFileRequest(),
		},
		{ id: 2, label: "File: Save File", action: () => saveCurrentFile() },
		{
			id: 4,
			label: "View: Show Files",
			action: () => togglePane(filePane),
			prefix: true,
		},
		{
			id: 5,
			label: "View: Show Search",
			action: () => togglePane(searchPane),
			prefix: true,
		},
		{
			id: 6,
			label: "View: Show Source Control",
			action: () => togglePane(sourceControlPane),
			prefix: true,
		},
		{
			id: 7,
			label: "View: Show Run And Debug",
			action: () => togglePane(runAndDebugPane),
			prefix: true,
		},
		{
			id: 8,
			label: "View: Show Extensions",
			action: () => togglePane(extensionsPane),
			prefix: true,
		},
	];

	const paneIsOpen = (openPane: any) =>
		panes().some((pane) => pane.name === openPane.name);

	const addPane = (newPane: any) => {
		if (!paneIsOpen(newPane)) {
			setPanes([...panes(), newPane]);
		}
	};

	const removePane = (paneName: string) =>
		setPanes(panes().filter((pane) => pane.name !== paneName));

	const togglePane = (pane: any) => {
		paneIsOpen(pane) ? removePane(pane.name) : addPane(pane);
	};

	const saveCurrentFile = () => {
		const filepath = TabStore.activeTab?.id;
		const fileData = EditorStore.getActiveEditor()?.getText();
		console.log("called");
		if (filepath && fileData) {
			saveFile(filepath, fileData);
		}
	};

	const saveFile = (filepath: string, fileData: string) => {
		window.api.sendSaveFileRequest(filepath, fileData);
	};

	const saveFileAs = (filepath: string, fileData: string) => {
		window.api.sendSaveFileAsRequest(filepath, fileData);
	};

	const handleGlobalKeyDown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === "p") {
			e.preventDefault();
			setInitWithPrefix(false);
			setIsOpen(true);
		} else if (e.ctrlKey && e.shiftKey && e.key === "P") {
			e.preventDefault();
			setInitWithPrefix(true);
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

	onMount(() => {
		document.addEventListener("keydown", handleGlobalKeyDown);

		window.addEventListener("save-file-request", saveCurrentFile);
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
			if (filepath && fileData) {
				saveFileAs(filepath, fileData);
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
