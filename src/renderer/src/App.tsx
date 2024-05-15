import { type Component, createSignal } from "solid-js";
import EditorCore from "./components/EditorCore/EditorCore";
import EditorView from "./components/EditorView/EditorView";
import StatusPane from "./components/StatusPane/StatusPane";
import { Editor } from "./models/Editor";

const App: Component = () => {
	const [editor] = createSignal(new Editor("", "editor-1"));

	let textAreaRef!: HTMLTextAreaElement;
	const click = () => {
		if (textAreaRef) {
			textAreaRef.focus();
		}
	};

	return (
		<>
			<EditorView click={click} editor={editor} />
			<EditorCore ref={textAreaRef} editor={editor} language="javascript" />
      <StatusPane editor={editor} />
		</>
	);
};

export default App;
