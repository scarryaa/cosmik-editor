import { derived } from "svelte/store";
import { editors, focusedEditorId } from "./editor";

// @TODO figure out how to do this in svelte 5
export const currentEditor = derived(
    [editors, focusedEditorId],
    ([$editors, $focusedEditorId]) => {
        return $editors.find(editor => editor.id === $focusedEditorId)?.instance || null;
    }
);