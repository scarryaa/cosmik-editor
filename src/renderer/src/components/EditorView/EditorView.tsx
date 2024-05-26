import { lineHeight } from "@renderer/const/const";
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
import { languageMap } from "@renderer/App";
import type { Editor } from "@renderer/models/Editor";
import { useFileStore } from "@renderer/stores/files";

export interface FoldRegion {
	startLine: number;
	endLine: number;
	isFolded: boolean;
}

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
	const [foldRegions, setFoldRegions] = createSignal<FoldRegion[]>([]);
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

	function identifyFoldRegions(tree: ASTNode): FoldRegion[] {
		let foldRegions: FoldRegion[] = [];
		if (!tree || !tree.children) return foldRegions;

		for (let child of tree.children) {
			if (shouldFold(child)) {
				foldRegions.push({
					startLine: calculateLineNumber(tree.text, child.startIndex),
					endLine: calculateLineNumber(tree.text, child.endIndex),
					isFolded: false, // Default to not folded
				});
			} else if (child.children) {
				foldRegions = foldRegions.concat(identifyFoldRegions(child));
			}
		}

		return foldRegions;
	}

	function shouldFold(node: ASTNode): boolean {
		const foldableTypes = ["comment", "function", "class", "block"];
		return foldableTypes.includes(node.type);
	}

	function calculateLineNumber(text: string, index: number): number {
		return text.slice(0, index).split("\n").length - 1;
	}

	function toggleFold(line: number): void {
		const regions = foldRegions().map((region) => {
			if (region.startLine <= line && region.endLine >= line) {
				return { ...region, isFolded: !region.isFolded };
			}
			return region;
		});
		setFoldRegions(regions);
	}

	function parseNode(
		node: ASTNode,
		rootText: string,
		styles: { [key: string]: string },
	): string {
		let spans: string[] = [];
		let current_position = node.startIndex;
		if (!node) return "";
		if (!node?.children || !TabStore.activeTab) return "";

		const extension = TabStore.activeTab!.id.split(".").pop()!;
		if (!(extension in languageMap) || extension in ["txt", "md"]) {
			return "";
		}

		// Function to escape special HTML characters
		const escapeHtml = (text: string) => {
			return text
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;")
				.replace(/\t/g, "    ");
		};

		for (let child of node.children) {
			if (child.startIndex > current_position) {
				let text_before =
					rootText?.slice(current_position, child.startIndex) ?? "";
				spans.push(
					escapeHtml(text_before)
						.replace(/ /g, "&nbsp;")
						.replace(/\n/g, "<br/>")
						.replace(/\t/g, "    "),
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
					.replace(/\n/g, "<br/>")
					.replace(/\t/g, "    ") ??
					"")
			}</span>`;
			spans.push(span);
			current_position = child.endIndex;
		}

		if (current_position < node.endIndex) {
			let text_after = rootText?.slice(current_position, node.endIndex) ?? "";
			spans.push(
				escapeHtml(text_after)
					.replace(/ /g, "&nbsp;")
					.replace(/\n/g, "<br/>")
					.replace(/\t/g, "    "),
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

	const visibleLines = createMemo(() => {
		const folds = foldRegions();
		return memoizedTextLines().filter((_, lineIndex) => {
			return !folds.some(
				(region) =>
					region.isFolded &&
					lineIndex > region.startLine &&
					lineIndex <= region.endLine,
			);
		});
	});

	const foldLines = createMemo(() => {
		return foldRegions().reduce((acc, region) => {
			if (region.isFolded) {
				for (let i = region.startLine + 1; i <= region.endLine; i++) {
					acc.push(i);
				}
			}
			return acc;
		}, [] as number[]);
	});

	createEffect(() => {
		if (parserTree() && TabStore.activeTab) {
			const newFoldRegions = identifyFoldRegions(parserTree());
			setFoldRegions(newFoldRegions);
		}
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
					<LineNumbers
						toggleFold={toggleFold}
						foldRegions={foldRegions()}
						scrollTop={viewScrollTop}
						editor={props.editor}
					/>
				</div>
				<div
					ref={contentContainerRef}
					class={styles["editor-content-container"]}
					onScroll={handleScroll}
				>
					<div class={styles["editor-lines-padding"]}>
						<div class={styles["editor-lines"]}>
							<For
								each={visibleLines().slice(
									visibleLinesStart(),
									visibleLinesStart() + windowSize() + 1,
								)}
							>
								{(text, index) => (
									<EditorLine
										foldLines={foldLines()}
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
