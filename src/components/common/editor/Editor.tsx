import React from "react";
import { useRef } from "react";
import { useEditor } from "../../../hooks/useEditor";
import { useLineCount } from "../../../hooks/useLineCount";
import { useListeners } from "../../../hooks/useListeners";
import "./Editor.scss";
import { LineNumbers } from "./LineNumbers";

const Editor = () => {
	const editorRef = useRef<HTMLDivElement>(null);
	const ELEMENT_ID = "editor";

	const { calculateLineCount, lineCount, setLineCount } = useLineCount();
	const { content, handleInput, handleKeyDown, setContent } = useEditor(
		editorRef,
		setLineCount,
		calculateLineCount,
		lineCount,
	);
	useListeners(editorRef, setContent);

	return (
		<div className="editor-wrapper">
			<LineNumbers lineCount={lineCount} />
			<div
				ref={editorRef}
				contentEditable={true}
				onInput={handleInput}
				onKeyDown={handleKeyDown}
				className={ELEMENT_ID}
				suppressContentEditableWarning={true}
				role="textbox"
				aria-multiline="true"
				aria-label="Editor"
				aria-live="polite"
				aria-atomic="true"
				tabIndex={0}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
};

export default React.memo(Editor);
