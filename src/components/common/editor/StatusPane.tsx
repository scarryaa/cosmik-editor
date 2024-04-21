import "./StatusPane.scss";

interface StatusPaneProps {
	lineNumber: number;
	char: number;
}

export const StatusPane: React.FC<StatusPaneProps> = ({ lineNumber, char }) => {
	return <div className="status-pane">Ln {lineNumber}, Col {char}</div>;
};
