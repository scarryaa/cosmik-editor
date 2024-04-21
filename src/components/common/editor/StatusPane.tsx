import React from "react";
import "./StatusPane.scss";

interface StatusPaneProps {
	lineNumber: number;
	char: number;
}

const StatusPane: React.FC<StatusPaneProps> = ({ lineNumber, char }) => {
	return <div className="status-pane">Ln {lineNumber}, Col {char}</div>;
};

export default React.memo(StatusPane);