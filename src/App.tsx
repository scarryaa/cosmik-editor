import "./App.scss";
import Editor from "./components/common/editor/Editor";
import { EditorProvider } from "./contexts/editorContext";

function App() {
	return (
		<div className="container">
			<EditorProvider>
				<Editor />
			</EditorProvider>
		</div>
	);
}

export default App;
