import type { IEditor } from "./IEditor";
import type { ITab } from "./ITab";

export interface IApp {
    editors: Map<string, IEditor>;
    currentEditorId: string | null;
    addEditor(editor: IEditor): string;
    removeEditor(guid: string): boolean;
    switchEditor(guid: string): boolean;
    getCurrentEditor(): IEditor | null;
    setEditorFromTab(tab: ITab): void;
}