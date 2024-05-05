import { getNumberOfLinesOnScreen } from "../components/AstroEditor/AstroEditorScrolling";
import { lineHeight } from "../const/const";
import { endLine, startLine } from "../stores/lines";

export const updateVisibleLines = (
	node: HTMLElement,
	lineCount: number,
	$startLine: number,
) => {
	const containerScrollTop = node?.scrollTop;
	const linesOnScreen = getNumberOfLinesOnScreen() + 1;
	startLine.set(Math.floor(containerScrollTop / lineHeight));
	endLine.set(Math.min(lineCount, $startLine + linesOnScreen));
};
