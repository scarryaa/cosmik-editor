import { lineHeight } from "@renderer/const/const";
import {
	type ParseType,
	parseBasedOnExtension,
} from "@renderer/services/syntaxService";
import { textService } from "@renderer/services/textService";
import TabStore from "@renderer/stores/tabs";
import { debounce } from "@renderer/util/util";
import {
	type Component,
	type JSX,
	createEffect,
	createMemo,
	createSignal,
} from "solid-js";
import styles from "./EditorLine.module.scss";

interface EditorLineProps {
	content: string;
	line: number;
	ref?: HTMLDivElement;
	selection: {
		startIndex: number;
		endIndex: number;
		startLine: number;
		endLine: number;
	};
	highlightedContent: JSX.Element;
}

const EditorLine: Component<EditorLineProps> = (props: EditorLineProps) => {
	const [highlightedContent, setHighlightedContent] = createSignal<string>(
		props.content,
	);
	const [selectedContent, setSelectedContent] = createSignal<string>("");
	const [selectionLeft, setSelectionLeft] = createSignal<number>(0);

	const debouncedParse = debounce(async (content: string) => {
		const activeTab = TabStore.activeTab;
		if (activeTab) {
			const extension = activeTab.id.split(".").pop() as ParseType;
			const parsedContent = await parseBasedOnExtension(extension, content);
			setHighlightedContent(parsedContent);
		}
	}, 0);

	const updateSelection = () => {
		let { startLine, endLine, startIndex, endIndex } = props.selection;

		if (startLine === endLine) {
			// Single-line selection
			setSelectedContent(props.content.slice(startIndex, endIndex));
			setSelectionLeft(
				textService.measureTextWidth(
					props.content.substring(0, startIndex),
					"Hack",
					14,
				),
			);
		} else if (props.line + 1 === startLine) {
			// Start of multi-line selection
			setSelectedContent(props.content.slice(startIndex));
			setSelectionLeft(
				textService.measureTextWidth(
					props.content.substring(0, startIndex),
					"Hack",
					14,
				),
			);
		} else if (props.line + 1 === endLine) {
			// End of multi-line selection
			setSelectedContent(props.content.slice(0, endIndex));
			setSelectionLeft(0);
		} else if (props.line + 1 > startLine && props.line + 1 < endLine) {
			// Middle of multi-line selection
			setSelectedContent(props.content);
			setSelectionLeft(0);
		} else {
			// Line not in selection
			setSelectedContent("");
			setSelectionLeft(0);
		}
	};

	const content = createMemo(() => props.content);

	createEffect(() => {
		if (
			props.selection.startLine <= props.line + 1 &&
			props.selection.endLine >= props.line + 1
		) {
			updateSelection();
		} else {
			setSelectedContent("");
			setSelectionLeft(0);
		}
	});

	createEffect(() => {
		debouncedParse(content());
	});

	return (
		<div
			data-line-number={props.line + 1}
			ref={props.ref}
			style={{
				transform: `translate3D(5px, ${props.line * lineHeight + 25}px, 0px)`,
			}}
			class={styles.line}
		>
			<div class={styles["line-content"]}>{props.highlightedContent ||  props.content}</div>
			<div
				class={styles.selection}
				style={{
					height: `${lineHeight}px`,
					transform: `translate3D(${selectionLeft()}px, -20px, 0px)`,
				}}
			>
				{selectedContent() !== "" && <div>{selectedContent()}</div>}
			</div>
		</div>
	);
};

export default EditorLine;
