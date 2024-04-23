import React from "react";
import type { Selection } from "../../../model/selectionModel";
import "./StatusPane.scss";

interface StatusPaneProps {
	lineNumber: number;
	char: number;
	selection: Selection;
}

const StatusPane: React.FC<StatusPaneProps> = ({
	lineNumber,
	char,
	selection,
}) => {
	return (
		<div className="status-pane">
			Ln {lineNumber}, Col {char}{" "}
			{selection.startIndex !== selection.endIndex
				? `(${selection.content.length} selected)`
				: ""}
		</div>
	);
};

export default React.memo(StatusPane);
