import { lineHeight } from "@renderer/const/const";
import type { Editor } from "@renderer/models/Editor";
import { useFileStore } from "@renderer/stores/files";
import { For, createEffect, createSignal, onCleanup } from "solid-js";
import type { Accessor, Component } from "solid-js";
import Cursor from "../Cursor/Cursor";
import EditorLine from "../EditorLine/EditorLine";
import LineNumbers from "../LineNumbers/LineNumbers";
import styles from "./EditorView.module.scss";

interface EditorViewProps {
	editor: Accessor<Editor>;
	click: () => void;
	scrollSignal: Accessor<boolean>;
}

const EditorView: Component<EditorViewProps> = (props) => {
	const [viewScrollTop, setViewScrollTop] = createSignal(0);
	const [cursorRefs, setCursorRefs] = createSignal<HTMLElement[]>([]);
	const fileStore = useFileStore();

	let contentContainerRef: HTMLDivElement | undefined;
	let lineRefs: HTMLDivElement[] = [];

	const ensureCursorVisible = (): void => {
		const cursorElement = cursorRefs[0];
		if (cursorElement) {
			scrollIfNeeded(cursorElement);
		}
	};

	const scrollIfNeeded = (targetElement: HTMLElement): void => {
		const scrollThreshold = 50;
		if (!contentContainerRef) return;

		const editorRect = contentContainerRef.getBoundingClientRect();
		const targetRect = targetElement.getBoundingClientRect();

		if (targetRect.bottom + scrollThreshold > editorRect.bottom) {
			const scrollAdjustment =
				targetRect.bottom - editorRect.bottom + lineHeight * 2;
			contentContainerRef.scrollTop += scrollAdjustment;
		} else if (targetRect.top - scrollThreshold < editorRect.top) {
			const scrollAdjustment = editorRect.top - targetRect.top + lineHeight * 2;
			contentContainerRef.scrollTop -= scrollAdjustment;
		}

		if (targetRect.right + scrollThreshold > editorRect.right) {
			contentContainerRef.scrollLeft +=
				targetRect.right - editorRect.right + scrollThreshold;
		} else if (targetRect.left - scrollThreshold < editorRect.left) {
			contentContainerRef.scrollLeft -=
				editorRect.left - targetRect.left + scrollThreshold;
		}
	};

	createEffect(() => {
		if (fileStore.fileContent) {
			props.editor().setContent(fileStore.fileContent);
		}
	});

	createEffect(() => {
		setCursorRefs(
			props.editor().cursors.map(() => document.createElement("div")),
		);

		onCleanup(() => {
			setCursorRefs([]);
		});
	});

	createEffect(() => {
		if (props.scrollSignal()) {
			ensureCursorVisible();
		}
	});

	return (
		<div onclick={props.click} class={styles["editor-view"]}>
			<div class={styles["editor-view-inner"]}>
				<div class={styles["editor-line-numbers"]}>
					<LineNumbers top={viewScrollTop} editor={props.editor} />
				</div>
				<div
					ref={contentContainerRef}
					class={styles["editor-content-container"]}
					onscroll={(e) => setViewScrollTop(e.target.scrollTop)}
				>
					<div class={styles["editor-lines-padding"]}>
						<div class={styles["editor-lines"]}>
							<For each={props.editor().getText().split("\n")}>
								{(text, index) => (
									<EditorLine
										ref={(el) => {
											lineRefs[index()] = el;
											return el;
										}}
										content={text}
										line={index()}
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
											cursorRefs[index()] = el;
											return el;
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
