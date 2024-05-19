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
		{ id: 1, label: "Open File", action: () => console.log("Open File") },
		{ id: 2, label: "Save File", action: () => console.log("Save File") },
		{ id: 3, label: "Close File", action: () => console.log("Close File") },
		{
			id: 4,
			label: "View: Show Files",
			action: () =>
				paneIsOpen(filePane) ? removePane(filePane.name) : addPane(filePane),
			prefix: true,
		},
		{
			id: 5,
			label: "View: Show Search",
			action: () =>
				paneIsOpen(searchPane)
					? removePane(searchPane.name)
					: addPane(searchPane),
			prefix: true,
		},
		{
			id: 6,
			label: "View: Show Source Control",
			action: () =>
				paneIsOpen(sourceControlPane)
					? removePane(sourceControlPane.name)
					: addPane(sourceControlPane),
			prefix: true,
		},
		{
			id: 7,
			label: "View: Show Run And Debug",
			action: () =>
				paneIsOpen(runAndDebugPane)
					? removePane(runAndDebugPane.name)
					: addPane(runAndDebugPane),
			prefix: true,
		},
		{
			id: 8,
			label: "View: Show Extensions",
			action: () =>
				paneIsOpen(extensionsPane)
					? removePane(extensionsPane.name)
					: addPane(extensionsPane),
			prefix: true,
		},
	];

	const paneIsOpen = (openPane: any) => {
		return panes().filter((pane) => pane.name === openPane.name).length > 0;
	};

	const addPane = (newPane: any) => {
		if (paneIsOpen(newPane)) {
			return;
		}

		setPanes([...panes(), newPane]);
	};

	const removePane = (paneName: string) => {
		setPanes(panes().filter((pane) => pane.name !== paneName));
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
		}
	};

	onMount(() => {
		document.addEventListener("keydown", handleGlobalKeyDown);
	});

	onCleanup(() => {
		document.removeEventListener("keydown", handleGlobalKeyDown);
	});

	createEffect(() => {
		if (textAreaRef && !isOpen()) {
			textAreaRef.focus();
		}
	});

	const click = () => {
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
					click={click}
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
