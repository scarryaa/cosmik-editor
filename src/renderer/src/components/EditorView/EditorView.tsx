import { lineHeight } from "@renderer/const/const";
import type { Editor } from "@renderer/models/Editor";
import { useFileStore } from "@renderer/stores/files";
import { parserTree } from "@renderer/stores/parser-tree";
import TabStore from "@renderer/stores/tabs";
import { getNumberOfLinesOnScreen } from "@renderer/util/util";
import { For, createEffect, createMemo, createSignal, on } from "solid-js";
import type { Accessor, Component } from "solid-js";
import Cursor from "../Cursor/Cursor";
import EditorLine from "../EditorLine/EditorLine";
import LineNumbers from "../LineNumbers/LineNumbers";
import TabsWrapper from "../TabsWrapper/TabsWrapper";
import styles from "./EditorView.module.scss";

interface EditorViewProps {
	editor: Accessor<Editor>;
	click: () => void;
	scrollSignal: Accessor<boolean>;
}

interface ASTNode {
	type: string;
	startIndex: number;
	endIndex: number;
	isNamed: boolean;
	children: ASTNode[];
	text: string;
}

const EditorView: Component<EditorViewProps> = (props) => {
	const [viewScrollTop, setViewScrollTop] = createSignal(0);
	const [viewScrollLeft, setViewScrollLeft] = createSignal(0);
	const [cursorRefs, setCursorRefs] = createSignal<HTMLElement[]>([]);
	const [visibleLinesStart, setVisibleLinesStart] = createSignal(0);
	const [spans, setSpans] = createSignal<string>();
	const windowSize = createMemo(() => getNumberOfLinesOnScreen(lineHeight) + 5);
	const fileStore = useFileStore();

	let contentContainerRef: HTMLDivElement | undefined;

	const ensureCursorVisible = () => {
		const cursorElement = cursorRefs()[0];
		if (cursorElement && contentContainerRef) {
			scrollIfNeeded(cursorElement);
		}
	};

	const scrollIfNeeded = (targetElement: HTMLElement): void => {
		const scrollThreshold = 50;
		if (!contentContainerRef) return;

		requestAnimationFrame(() => {
			const editorRect = contentContainerRef!.getBoundingClientRect();
			const targetRect = targetElement.getBoundingClientRect();

			let scrollTopAdjustment = 0;
			let scrollLeftAdjustment = 0;

			if (targetRect.bottom + scrollThreshold > editorRect.bottom) {
				scrollTopAdjustment =
					targetRect.bottom - editorRect.bottom + lineHeight * 2;
			} else if (targetRect.top - scrollThreshold < editorRect.top) {
				scrollTopAdjustment = -(
					editorRect.top -
					targetRect.top +
					lineHeight * 2
				);
			}

			if (targetRect.right + scrollThreshold > editorRect.right) {
				scrollLeftAdjustment =
					targetRect.right - editorRect.right + scrollThreshold;
			} else if (targetRect.left - scrollThreshold < editorRect.left) {
				scrollLeftAdjustment = -(
					editorRect.left -
					targetRect.left +
					scrollThreshold
				);
			}

			if (scrollTopAdjustment !== 0 || scrollLeftAdjustment !== 0) {
				contentContainerRef!.scrollTo({
					top: contentContainerRef!.scrollTop + scrollTopAdjustment,
					left: contentContainerRef!.scrollLeft + scrollLeftAdjustment,
					behavior: "auto",
				});
			}
		});
	};

	const handleScroll = (e: Event) => {
		const container = e.currentTarget as HTMLDivElement;
		const scrollTop = container.scrollTop;
		const scrollLeft = container.scrollLeft;

		requestAnimationFrame(() => {
			setViewScrollTop(scrollTop);
			setViewScrollLeft(scrollLeft);

			const visibleLinesStart = Math.max(
				Math.floor(scrollTop / lineHeight) - 5,
				0,
			);
			setVisibleLinesStart(visibleLinesStart);

			TabStore.updateTab(TabStore.activeTab!.id, {
				scrollX: scrollLeft,
				scrollY: scrollTop,
			});
		});
	};

	const specialCharacterStyles: { [key: string]: string } = {
		"{": "left-bracket",
		"}": "right-bracket",
		"[": "left-square-bracket",
		"]": "right-square-bracket",
		";": "semicolon",
		":": "colon",
		"'": "single-quote",
		'"': "double-quote",
		"(": "left-parenthesis",
		")": "right-parenthesis",
		",": "comma",
		".": "dot",
		"&&": "double-ampersand",
		"/>": "closing-greater-than",
		">": "greater-than",
		"<": "less-than",
	};

	function parseNode(
		node: ASTNode,
		rootText: string,
		styles: { [key: string]: string },
	): string {
		let spans: string[] = [];
		let current_position = node.startIndex;
		if (!node) return "";
		if (!node?.children) return "";

		// Function to escape special HTML characters
		const escapeHtml = (text: string) => {
			return text
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;");
		};

		for (let child of node.children) {
			if (child.startIndex > current_position) {
				let text_before =
					rootText?.slice(current_position, child.startIndex) ?? "";
				spans.push(
					escapeHtml(text_before)
						.replace(/ /g, "&nbsp;")
						.replace(/\n/g, "<br/>"),
				);
			}

			let childSpan = parseNode(child, rootText, styles);
			let spanType =
				styles[specialCharacterStyles[child.type]] ||
				styles[child.type] ||
				child.type ||
				"default-style";
			let span = `<span class="${spanType}">${
				childSpan ||
				(escapeHtml(rootText?.slice(child.startIndex, child.endIndex))
					?.replace(/ /g, "&nbsp;")
					.replace(/\n/g, "<br/>") ??
					"")
			}</span>`;
			spans.push(span);
			current_position = child.endIndex;
		}

		if (current_position < node.endIndex) {
			let text_after = rootText?.slice(current_position, node.endIndex) ?? "";
			spans.push(
				escapeHtml(text_after).replace(/ /g, "&nbsp;").replace(/\n/g, "<br/>"),
			);
		}

		setSpans(spans.join(""));
		return spans.join("");
	}

	const memoizedParseNode = createMemo(() => {
		if (parserTree()) {
			return parseNode(parserTree(), parserTree().text, styles);
		}
		return "";
	});

	const memoizedTextLines = createMemo(() =>
		props.editor().getText().split("\n"),
	);

	const lines = createMemo(() => {
		return memoizedParseNode()?.split("<br/>");
	});

	createEffect(
		on(
			() => TabStore.activeTab?.id,
			() => {
				if (TabStore.activeTab) {
					const scrollX = TabStore.activeTab.scrollX;
					const scrollY = TabStore.activeTab.scrollY;
					setViewScrollTop(scrollY);
					setViewScrollLeft(scrollX);

					if (contentContainerRef) {
						contentContainerRef.scrollTo({
							top: scrollY,
							left: scrollX,
						});
					}
				}
			},
		),
	);

	createEffect(() => {
		if (fileStore.fileContent) {
			props.editor().setContent(fileStore.fileContent);
		}
	});

	createEffect(
		on(
			() => props.editor().cursors.length,
			() => {
				setCursorRefs(
					props.editor().cursors.map(() => document.createElement("div")),
				);
			},
			{ defer: true },
		),
	);

	createEffect(
		on(
			() => props.scrollSignal() && props.editor().cursors[0],
			() => ensureCursorVisible(),
			{ defer: true },
		),
	);

	createEffect(() => {
		if (parserTree()) {
			parseNode(parserTree(), parserTree().text, styles);
		}
	});

	return (
		<div
			onClick={props.click}
			onKeyPress={props.click}
			class={styles["editor-view"]}
		>
			<TabsWrapper />
			<div class={styles["editor-view-inner"]}>
				<div class={styles["editor-line-numbers"]}>
					<LineNumbers scrollTop={viewScrollTop} editor={props.editor} />
				</div>
				<div
					ref={contentContainerRef}
					class={styles["editor-content-container"]}
					onScroll={handleScroll}
				>
					<div class={styles["editor-lines-padding"]}>
						<div class={styles["editor-lines"]}>
							<For
								each={memoizedTextLines().slice(
									visibleLinesStart(),
									visibleLinesStart() + windowSize() + 1,
								)}
							>
								{(text, index) => (
									<EditorLine
										content={text}
										line={visibleLinesStart() + index() - 1}
										selection={{
											startIndex: props.editor().selections[0]?.startIndex,
											endIndex: props.editor().selections[0]?.endIndex,
											startLine: props.editor().selections[0]?.startLine,
											endLine: props.editor().selections[0]?.endLine,
										}}
										highlightedContent={
											lines()?.[visibleLinesStart() + index()]
										}
									/>
								)}
							</For>
							<div
								class={styles["editor-line-padding"]}
								style={`top: ${props.editor().totalLines() * lineHeight}px;`}
							/>
							<For each={props.editor().cursors}>
								{(cursor, index) => (
									<Cursor
										editor={props.editor}
										cursor={() => cursor}
										ref={(el) => {
											const refs = cursorRefs();
											refs[index()] = el;
											setCursorRefs(refs);
										}}
									/>
								)}
							</For>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorView;
