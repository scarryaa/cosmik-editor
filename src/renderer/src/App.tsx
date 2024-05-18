import { type Component, createSignal } from "solid-js";
import EditorCore from "./components/EditorCore/EditorCore";
import EditorView from "./components/EditorView/EditorView";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import StatusPane from "./components/StatusPane/StatusPane";
import { Editor } from "./models/Editor";
import EditorStore from "./stores/editors";
import TabStore from "./stores/tabs";

EditorStore.addEditor(new Editor("", "editor1"));
EditorStore.setActiveEditor("editor1");

const App: Component = () => {
	const [scrollSignal, setScrollSignal] = createSignal<boolean>(false);
	let textAreaRef!: HTMLTextAreaElement;

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
			<LeftSidebar />
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
