import type { TabState } from "@renderer/stores/tabs";
import type { ICursor } from "./Cursor";

export interface Tab {
    id: string;
    editorId: string;
    name: string;
    icon?: string;
    active: boolean;
    state: TabState;
    saved: boolean;
    content: string;
    cursor: ICursor;
    scrollY: number;
    scrollX: number;
  }