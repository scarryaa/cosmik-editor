import {
	scrollHorizontalPosition,
	scrollVerticalPosition,
} from "../stores/scroll";
import { updateVisibleLines } from "../util/line-numbers";

export const scrollAction = (
	node: HTMLElement,
	params: {
		$lineNumbers: HTMLElement;
		wrapperInner: HTMLElement | undefined;
		lineCount: number;
		$startLine: () => number;
	},
) => {
	const handleScroll = () => {
		updateScroll(node);
		if (params.wrapperInner) {
			updateLineNumbersTransform(params.$lineNumbers, params.wrapperInner);
		}
		updateVisibleLines(node, params.lineCount, params.$startLine());
	};

	node.addEventListener("scroll", handleScroll);

	return {
		destroy() {
			node.removeEventListener("scroll", handleScroll);
		},
	};
};

const updateScroll = (node: HTMLElement) => {
	scrollVerticalPosition.set(node.scrollTop);
	scrollHorizontalPosition.set(node.scrollLeft);
};

const updateLineNumbersTransform = (
	$lineNumbers: HTMLElement,
	wrapperInner: HTMLElement,
): void => {
	$lineNumbers.style.transform = `translateY(${-wrapperInner.scrollTop}px)`;
};
