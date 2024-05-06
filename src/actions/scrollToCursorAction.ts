import { scrollToCurrentLine } from "../components/AstroEditor/AstroEditorScrolling";
import { Cursor, CursorDirection } from "../models/Cursor";
import type { Editor } from "../models/Editor";
import { measureTextWidth } from "../util/text";

export function scrollToCursorAction(
	node: HTMLDivElement,
	params: {
		$editor: Editor;
		$scrollHorizontalPosition: () => number;
		$editorWidth: number;
		$astroWrapperInner: () => HTMLDivElement;
		$currentLineElement: () => HTMLDivElement;
	},
) {
	const edgeThreshold = 50;

	function scrollToCursor(event: CustomEvent<{ direction: CursorDirection }>) {
		const cursorPosition = params.$editor.getCursor().getPosition();
		const contentUpToCursor = params.$editor
			.getContent()
			[cursorPosition.line].getContent()
			.substring(0, cursorPosition.character);
		const cursorLeft = measureTextWidth(contentUpToCursor);

		const visibleLeft = params.$scrollHorizontalPosition();
		const visibleRight = visibleLeft + node.clientWidth;

		const isNearLeftEdge = cursorLeft < visibleLeft + edgeThreshold;
		const isNearRightEdge = cursorLeft > visibleRight - edgeThreshold;

		if (
			isNearLeftEdge &&
			params.$editor.getCursor().getDirection() === CursorDirection.Left
		) {
			node.scrollTo({
				left: cursorLeft - edgeThreshold,
				behavior: "auto",
			});
		} else if (
			isNearRightEdge &&
			params.$editor.getCursor().getDirection() === CursorDirection.Right
		) {
			node.scrollTo({
				left: cursorLeft - node.clientWidth + edgeThreshold,
				behavior: "auto",
			});
		} else if (event.detail.direction === CursorDirection.Down) {
			scrollToCurrentLine(
				params.$currentLineElement,
				params.$astroWrapperInner,
				"down",
			);
		} else if (event.detail.direction === CursorDirection.Up) {
			scrollToCurrentLine(
				params.$currentLineElement,
				params.$astroWrapperInner,
				"up",
			);
		}
	}

	const handleCursorPositionChange = (event: CustomEvent) => {
		scrollToCursor(event);
	};

	node.addEventListener("cursorPositionChange", (event) =>
		handleCursorPositionChange(event as CustomEvent),
	);

	return {
		destroy() {
			node.removeEventListener("cursorPositionChange", (event) =>
				handleCursorPositionChange(event as CustomEvent),
			);
		},
	};
}
