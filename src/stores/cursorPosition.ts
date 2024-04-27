import { writable } from 'svelte/store';

export const cursorPosition = writable({ cursorLine: 1, cursorCharacter: 0 });