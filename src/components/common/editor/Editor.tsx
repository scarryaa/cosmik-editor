import React, { useEffect, useRef, useState } from "react";
import { useEditorEvents } from "../../../hooks/useEditorEvents";
import { EditorModel } from "../../../model/editorModel";
import "./Editor.scss";
import { LineNumbers } from "./LineNumbers";
import { StatusPane } from "./StatusPane";

const Editor = () => {
	const editorRef = useRef<HTMLDivElement>(null);
	const editorModelRef = useRef<EditorModel | null>(null);
	const [lines, setLines] = useState<string[]>([]);
	const [lineCount, setLineCount] = useState<number>(1);
	const [cursorLine, setCursorLine] = useState<number>(1);
	const [cursorChar, setCursorChar] = useState<number>(1);

	useEffect(() => {
		editorModelRef.current = new EditorModel({ initialContent: "" });
		updateEditorContent("");
	}, []);

	const updateEditorContent = (newContent: string) => {
		const newLines = newContent.split("\n").map((line) => {
			return (
				line
					// Replace spaces with non-breaking spaces
					.replace(/ /g, "\u00a0")
					// If the content is empty, add a non-breaking space
					.replace(/^\s*$/g, "\u00a0")
			);
		});
		setLines(newLines);
		setLineCount(newLines.length);
	};

	const updateCursor = (opts: { line: number; char: number }) => {
		setCursorChar(opts.char);
		setCursorLine(opts.line);
	};

	const { handleKeyDown } = useEditorEvents(
		editorRef,
		editorModelRef,
		updateEditorContent,
		updateCursor,
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
					{lines.map((line, index) => (
						<div data-line-number={index} key={`line-${index}-${line}`}>
							{line}
						</div>
					))}
				</div>
			</div>
			<StatusPane lineNumber={cursorLine} char={cursorChar} />
		</>
	);
};

export default React.memo(Editor);
