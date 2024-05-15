import { type Component, createSignal } from "solid-js";
import EditorCore from "./components/EditorCore/EditorCore";
import EditorView from "./components/EditorView/EditorView";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import StatusPane from "./components/StatusPane/StatusPane";
import { Editor } from "./models/Editor";

const App: Component = () => {
	const [editor] = createSignal(new Editor("", "editor-1"));
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
			<EditorView scrollSignal={scrollSignal} click={click} editor={editor} />
			<EditorCore
				ensureCursorVisible={handleEnter}
				ref={textAreaRef}
				editor={editor}
				language="javascript"
			/>
			<StatusPane editor={editor} />
		</div>
	);
};

export default App;
