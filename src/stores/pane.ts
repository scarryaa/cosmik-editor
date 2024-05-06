import { get, writable } from "svelte/store";
import type { Pane } from "../components/Pane/pane";

export const createPaneStore = () => {
	const panes = writable<{ id: string; instance: Pane }[]>([]);
	const focusedPaneId = writable<string | null>(null);

	const addPane = (paneInstance: Pane): void => {
		const id = crypto.randomUUID();

		panes.update((currentPanes) => [
			...currentPanes,
			{ id, instance: paneInstance },
		]);
	};

	const removePane = (paneId: string): void => {
		panes.update((currentPanes) =>
			currentPanes.filter((pane) => pane.id !== paneId),
		);
	};

	const setFocusedPaneId = (id: string | null): void => {
		focusedPaneId.set(id);
	};

	const getPaneById = (paneId: string): Pane | null => {
		const allPanes = get(panes);
		const currentPane = allPanes.find((pane) => pane.id === paneId);
		return currentPane ? currentPane.instance : null;
	};

	return {
		panes,
		focusedPaneId,
		addPane,
		removePane,
		setFocusedPaneId,
		getPaneById,
	};
};

export const {
	panes,
	focusedPaneId,
	addPane,
	removePane,
	setFocusedPaneId,
	getPaneById,
} = createPaneStore();
