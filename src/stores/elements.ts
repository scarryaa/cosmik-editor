import { writable } from "svelte/store";

export const astroWrapper = writable<HTMLDivElement>();
export const astroEditor = writable<HTMLDivElement>();
export const app = writable<HTMLDivElement>();