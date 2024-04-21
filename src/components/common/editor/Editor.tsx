import React, { useEffect, useMemo, useRef } from "react";
import { useEditor } from "../../../contexts/editorContext";
import { EditorModel } from "../../../model/editorModel";
import "./Editor.scss";
import LineNumbers from "./LineNumbers";
import StatusPane from "./StatusPane";

const Editor = () => {
	const {
		lines,
		updateEditorContent,
		lineCount,
		handleKeyDown,
		cursorPosition,
		editorRef,
		editorModelRef
	} = useEditor();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Adding 'updateEditorContent' to deps causes infinite loop
	useEffect(() => {
		updateEditorContent("");
	}, []);

	const linesMapping = useMemo(
		() =>
			lines.map((line, index) => (
				<div data-line-number={index} key={`line-${index}-${line}`}>
					{line}
				</div>
			)),
		[lines],
	);

	return (
		<>
			<div className="editor-wrapper">
				<LineNumbers lineCount={lineCount} />
				<div
					ref={editorRef}
					contentEditable={true}
					onKeyDown={handleKeyDown}
					className="editor"
					suppressContentEditableWarning={true}
					role="textbox"
					aria-multiline="true"
					aria-label="Editor"
					aria-live="polite"
					aria-atomic="true"
					tabIndex={0}
				>
					{linesMapping}
				</div>
			</div>
			<StatusPane
				lineNumber={cursorPosition.line + 1}
				char={cursorPosition.char + 1}
			/>
		</>
	);
};

export default React.memo(Editor);
