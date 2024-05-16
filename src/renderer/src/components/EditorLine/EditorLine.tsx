import { lineHeight } from "@renderer/const/const";
import { type ParseType, parseBasedOnExtension } from "@renderer/services/syntaxService";
import TabStore from "@renderer/stores/tabs";
import { type Component, createEffect, createSignal } from "solid-js";
import styles from "./EditorLine.module.scss";

interface EditorLineProps {
  content: string;
  line: number;
  ref?: HTMLDivElement;
}

const EditorLine: Component<EditorLineProps> = (props: EditorLineProps) => {
  const [highlightedContent, setHighlightedContent] = createSignal<string>("");

  createEffect(async () => {
    if (TabStore.activeTab) {
      const extension = TabStore.activeTab.id.split(".").pop() as ParseType;
      const parsedContent = await parseBasedOnExtension(extension, props.content);
      setHighlightedContent(parsedContent);
    }
  });

  return (
    <div
      ref={props.ref}
      style={`top: ${props.line * lineHeight}px;`}
      class={styles.line}
      innerHTML={highlightedContent()}
    />
  );
};

export default EditorLine;
