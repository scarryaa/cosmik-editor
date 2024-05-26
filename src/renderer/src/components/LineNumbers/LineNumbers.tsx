import { lineHeight } from "@renderer/const/const";
import type { Editor } from "@renderer/models/Editor";
import { getNumberOfLinesOnScreen } from "@renderer/util/util";
import {
	type Accessor,
	type Component,
	For,
	Show,
	createEffect,
	createSignal,
	on,
} from "solid-js";
import styles from "./LineNumbers.module.scss";
import { TbChevronDown } from "solid-icons/tb";
import type { FoldRegion } from "../EditorView/EditorView";

interface LineNumbersProps {
	editor: Accessor<Editor>;
	scrollTop: Accessor<number>;
	contentContainerRef?: HTMLDivElement | undefined;
	foldRegions: Array<FoldRegion>;
	toggleFold: (line: number) => void;
}

const LineNumbers: Component<LineNumbersProps> = (props) => {
	const [visibleLinesStart, setVisibleLinesStart] = createSignal(0);
	const [visibleLinesEnd, setVisibleLinesEnd] = createSignal(0);
	const [arrayLength, setArrayLength] = createSignal(0);
	const [activeLine, setActiveLine] = createSignal(
		props.editor().cursorAt(0).line,
	);

	const calculateVisibleLines = () => {
		const start = Math.floor(props.scrollTop() / lineHeight);
		const end = start + getNumberOfLinesOnScreen(lineHeight) + 1;
		setVisibleLinesStart(start);
		setVisibleLinesEnd(end);
		setArrayLength(getNumberOfLinesOnScreen(lineHeight) + 2);
	};

	// Initial calculation
	calculateVisibleLines();

	createEffect(
		on(props.scrollTop, () => {
			calculateVisibleLines();
		}),
	);

	// Update active line on cursor change
	createEffect(
		on(
			() => props.editor().cursorAt(0).line,
			() => {
				setActiveLine(props.editor().cursorAt(0).line);
			},
		),
	);

	createEffect(
		on(
			() => props.editor().cursorAt(0).line,
			() => {
				const cursorLine = props.editor().cursorAt(0).line;
				if (
					cursorLine < visibleLinesStart() ||
					cursorLine > visibleLinesEnd()
				) {
					const scrollToLine = Math.max(0, cursorLine - 5);
					props.contentContainerRef?.scrollTo({
						top: scrollToLine * lineHeight,
						behavior: "auto",
					});
				}
			},
			{ defer: true },
		),
	);

	const getTransformForLine = (index: number) => {
		return `translateY(${index * lineHeight}px)`;
	};

	return (
		<div
			class={styles["line-numbers"]}
			style={{ transform: `translateY(${-props.scrollTop()}px)` }}
		>
			<div class={styles["line-numbers-inner"]}>
				<For each={Array.from({ length: arrayLength() })}>
					{(_, index) => {
						return (
							<>
								<Show
									when={
										visibleLinesStart() + index() + 1 <
										props.editor().totalLines() + 1
									}
								>
									<div
										class={
											styles["line-number"] +
											(activeLine() === visibleLinesStart() + index()
												? ` ${styles.active}`
												: "")
										}
										style={{
											transform: getTransformForLine(
												visibleLinesStart() + index(),
											),
										}}
									>
										<Show
											when={props.foldRegions
												.map((f) => f.startLine)
												.includes(visibleLinesStart() + index())}
										>
											<div
												class={styles["fold-line-icon"]}
												onMouseDown={() =>
													props.toggleFold(visibleLinesStart() + index() + 1)
												}
											>
												<TbChevronDown font-size="15" />
											</div>
										</Show>
										{visibleLinesStart() + index() + 1}
									</div>
								</Show>
							</>
						);
					}}
				</For>
			</div>
		</div>
	);
};

export default LineNumbers;
