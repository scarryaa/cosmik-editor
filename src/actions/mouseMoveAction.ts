import { handleMouseMove } from "../components/AstroEditor/AstroEditor";
import type { Editor } from "../models/Editor";

export const mouseMoveAction = (
	node: HTMLElement,
	params: {
		$editor: Editor;
		$selecting: boolean;
		$lastMousePosition: { left: number; top: number };
	},
) => {
	const _handleMouseMove = (event: MouseEvent) => {
		handleMouseMove(
			event,
			params.$editor,
			params.$selecting,
			params.$lastMousePosition,
		);
	};

	document.addEventListener("mousemove", _handleMouseMove);

	return {
		destroy() {
			document.removeEventListener("mousemove", _handleMouseMove);
		},
	};
};
