import type { TabState } from "@renderer/stores/tabs";

export interface Tab {
    id: string;
    name: string;
    icon?: string;
    active: boolean;
    state: TabState;
    saved: boolean;
    content: string;
  }