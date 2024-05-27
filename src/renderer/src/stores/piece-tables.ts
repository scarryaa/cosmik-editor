import type { PieceTable } from "@renderer/models/PieceTable";
import { createStore } from "solid-js/store";

const [state, setState] = createStore({
	pieceTables: new Map<string, PieceTable>(),
	activePieceTableId: null as string | null,
});

const PieceTableStore = {
	get pieceTables() {
		return state.pieceTables;
	},
	get activePieceTable() {
		return state.pieceTables.get(state.activePieceTableId!);
	},
	get activePieceTableId() {
		return state.activePieceTableId;
	},

	setActivePieceTable(id: string | null) {
		setState("activePieceTableId", id);
	},
	addPieceTable(id: string, pieceTable: PieceTable) {
		setState("pieceTables", new Map([...state.pieceTables, [id, pieceTable]]));
	},
	removePieceTable(id: string) {
		setState("pieceTables", (prevPieceTables) => {
			const newPieceTables = new Map(prevPieceTables);
			newPieceTables.delete(id);
			return newPieceTables;
		});
	},
	removeAllExcept(id: string) {
		setState("pieceTables", (prevPieceTables) => {
            const newPieceTables = new Map(prevPieceTables);
            newPieceTables.forEach((pieceTable, key) => {
                if (key!== id) {
                    newPieceTables.delete(key);
                }
            });
            return newPieceTables;
        });
    },
	removeAll() {
		setState("pieceTables", new Map<string, PieceTable>());
    },
	getPieceTable(id: string) {
		return state.pieceTables.get(id);
	},
};

export default PieceTableStore;
