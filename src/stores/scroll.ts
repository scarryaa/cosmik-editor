import { writable } from "svelte/store";

type ScrollStore = {
  scrollVerticalPosition: ReturnType<typeof writable>;
  scrollHorizontalPosition: ReturnType<typeof writable>;
};

export const tabsScrollStores = writable<{ [tabId: string]: ScrollStore }>({});

export const registerTabScrollStore = (tabId: string): void => {
  tabsScrollStores.update((stores) => {
    const newStore = createScrollStore();
    stores[tabId] = newStore;
    return stores;
  });
}

export const unregisterTabScrollStore = (tabId: string): void => {
  tabsScrollStores.update((stores) => {
    delete stores[tabId];
    return stores;
  });
}

export const createScrollStore = (): ScrollStore => {
    const scrollVerticalPosition = writable(0);
    const scrollHorizontalPosition = writable(0);
  
    return {
      scrollVerticalPosition,
      scrollHorizontalPosition,
    };
  };

export const scrollVerticalPosition = writable(0);
export const scrollHorizontalPosition = writable(0);