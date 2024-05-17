import { lineHeight } from "@renderer/const/const";
import type { Editor } from "@renderer/models/Editor";
import { useFileStore } from "@renderer/stores/files";
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

const EditorView: Component<EditorViewProps> = (props) => {
    const [viewScrollTop, setViewScrollTop] = createSignal(0);
    const [viewScrollLeft, setViewScrollLeft] = createSignal(0);
    const [cursorRefs, setCursorRefs] = createSignal<HTMLElement[]>([]);
    const [visibleLinesStart, setVisibleLinesStart] = createSignal(0);
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
                requestAnimationFrame(() => {
                    contentContainerRef!.scrollTo({
                        top: contentContainerRef!.scrollTop + scrollTopAdjustment,
                        left: contentContainerRef!.scrollLeft + scrollLeftAdjustment,
                        behavior: "auto",
                    });
                });
            }
        });
    };

    const handleScroll = (e: Event) => {
        const container = e.currentTarget as HTMLDivElement;
        const scrollTop = container.scrollTop;
        const scrollLeft = container.scrollLeft;

        setViewScrollTop(scrollTop);
        setViewScrollLeft(scrollLeft);

        const visibleLinesStart = Math.max(
            Math.floor(scrollTop / lineHeight) - 5,
            0
        );
        const visibleLinesEnd =
            visibleLinesStart + getNumberOfLinesOnScreen(lineHeight) + 5;
        setVisibleLinesStart(visibleLinesStart);

        TabStore.updateTab(TabStore.activeTab!.id, {
            scrollX: scrollLeft,
            scrollY: scrollTop,
        });
    };

    createEffect(
        on(
            () => TabStore.activeTab?.id, // Track the active tab ID
            () => {
                if (TabStore.activeTab) {
                    const scrollX = TabStore.activeTab.scrollX;
                    const scrollY = TabStore.activeTab.scrollY;
                    setViewScrollTop(scrollY);
                    setViewScrollLeft(scrollX);

                    const visibleLinesStart = Math.max(
                        Math.floor(scrollY / lineHeight) - 5,
                        0
                    );

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
                    props.editor().cursors.map(() => document.createElement("div"))
                );
            },
            { defer: true }
        )
    );

    createEffect(
        on(
            () => props.scrollSignal() && props.editor().cursors[0],
            () => ensureCursorVisible(),
            { defer: true }
        )
    );

    const memoizedTextLines = createMemo(() =>
        props.editor().getText().split("\n")
    );

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
                                    visibleLinesStart() + windowSize() + 1
                                )}
                            >
                                {(text, index) => (
                                    <EditorLine
                                        content={text}
                                        line={visibleLinesStart() + index() - 1}
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
                                            cursorRefs()[index()] = el;
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
