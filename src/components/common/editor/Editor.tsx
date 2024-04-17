import React from "react";
import { useRef } from "react";
import { useEditor } from "../../../hooks/useEditor";
import { useLineCount } from "../../../hooks/useLineCount";
import "./Editor.scss";
import { LineNumbers } from "./LineNumbers";

const Editor = () => {
	const editorRef = useRef<HTMLDivElement>(null);

	const { calculateLineCount, lineCount, setLineCount } = useLineCount();
	const { content, handleInput, handleKeyDown, handlePaste } = useEditor(
		editorRef,
		setLineCount,
		calculateLineCount,
		lineCount,
	);

	return (
		<div className="editor-wrapper">
			<LineNumbers lineCount={lineCount} />
			<div
				ref={editorRef}
				contentEditable={true}
				onInput={handleInput}
				onKeyDown={handleKeyDown}
				onPaste={handlePaste}
				className="editor"
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
