import { lineHeight } from "@renderer/const/const";
import {
    type ParseType,
    parseBasedOnExtension,
} from "@renderer/services/syntaxService";
import TabStore from "@renderer/stores/tabs";
import { debounce } from "@renderer/util/util";
import {
    type Component,
    createEffect,
    createMemo,
    createSignal,
} from "solid-js";
import styles from "./EditorLine.module.scss";

interface EditorLineProps {
    content: string;
    line: number;
    ref?: HTMLDivElement;
}

const EditorLine: Component<EditorLineProps> = (props: EditorLineProps) => {
    const [highlightedContent, setHighlightedContent] = createSignal<string>(
        props.content,
    );

    const debouncedParse = debounce(async (content: string) => {
        if (TabStore.activeTab) {
            const extension = TabStore.activeTab.id.split(".").pop() as ParseType;
            const parsedContent = await parseBasedOnExtension(extension, content);
            setHighlightedContent(parsedContent);
        }
    }, 0);

    const content = createMemo(() => props.content);

    createEffect(() => {
        debouncedParse(content());
    });

    return (
        <div
            ref={props.ref}
            style={{ transform: `translate3D(5px, ${props.line * lineHeight + 25}px, 0px)` }}
            class={styles.line}
            innerHTML={highlightedContent()}
        />
    );
};

export default EditorLine;
