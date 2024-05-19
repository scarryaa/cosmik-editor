import { panes, setPanes } from "@renderer/stores/panes";
import { TbPlus } from "solid-icons/tb";
import { type Component, For, createSignal, onCleanup } from "solid-js";
import Pane from "../Pane/Pane";
import styles from "./LeftSidebar.module.scss";

export interface LeftSidebarProps {
	addPane: (pane: any) => void;
	removePane: (paneName: string) => void;
}

const LeftSidebar: Component<LeftSidebarProps> = (props: LeftSidebarProps) => {
	const MAX_COLUMNS = 50;
	const [columns, setColumns] = createSignal(2);
	const [isDragging, setIsDragging] = createSignal(false);
	const [dropTarget, setDropTarget] = createSignal<number | null>(null);
	const [windowHeight, setWindowHeight] = createSignal(window.innerHeight);
	const [padding, setPadding] = createSignal(20);
	let dragImage: HTMLDivElement | null = null;

	const updateWindowHeight = () => {
		setWindowHeight(window.innerHeight);
	};

	window.addEventListener("resize", updateWindowHeight);

	onCleanup(() => {
		window.removeEventListener("resize", updateWindowHeight);
	});

	const handleDragStart = (e: DragEvent, id: number) => {
		e.dataTransfer!.setData("text/plain", id.toString());

		dragImage = document.createElement("div");
		dragImage.classList.add(styles["drag-image"]);
		const pane = panes().find((p) => p.id === id);
		if (pane) {
			dragImage.textContent = pane.name;
			document.body.appendChild(dragImage);
			e.dataTransfer!.setDragImage(dragImage, 0, 0);
		}

		setIsDragging(true);
	};

	const handleDragEnd = () => {
		setIsDragging(false);
		setDropTarget(null);
		document.body.removeChild(dragImage!);
	};

	const handleDragOver = (e: DragEvent, columnIndex: number) => {
		e.preventDefault();
		setDropTarget(columnIndex);
	};

	const handleDrop = (e: DragEvent, columnIndex: number) => {
		e.preventDefault();
		const paneId = Number.parseInt(e.dataTransfer!.getData("text/plain"), 10);

		let updatedPanes = panes().map((pane) =>
			pane.id === paneId ? { ...pane, column: columnIndex } : pane,
		);

		if (columnIndex === columns() && columns() < MAX_COLUMNS) {
			setColumns(columns() + 1);
		}

		const nonEmptyColumns = new Set(updatedPanes.map((pane) => pane.column));
		const newPanes = updatedPanes.map((pane) => ({
			...pane,
			column: [...nonEmptyColumns].indexOf(pane.column),
		}));

		updatedPanes = adjustPaneHeights(newPanes, columnIndex);

		setPanes(updatedPanes);
		setColumns(nonEmptyColumns.size);

		setIsDragging(false);
		setDropTarget(null);
	};

	const adjustPaneHeights = (panes, columnIndex) => {
		const columnPanes = panes.filter((pane) => pane.column === columnIndex);

		// Find the index of the first pane in the column
		const firstPaneIndex = panes.findIndex(
			(pane) => pane.column === columnIndex,
		);

		let totalHeight = columnPanes.reduce((acc, pane, index) => {
			const panePadding = index === 0 ? padding() : 0; // Add padding only to the first pane
			return acc + Number.parseInt(pane.height) + panePadding;
		}, 0);

		if (totalHeight > windowHeight()) {
			const ratio = windowHeight() / totalHeight;
			return panes.map((pane, index) => {
				const panePadding = index === firstPaneIndex ? padding() : 0;
				if (pane.column === columnIndex) {
					return {
						...pane,
						height: `${
							(Number.parseInt(pane.height) + panePadding) * ratio - panePadding
						}px`,
					};
				}
				return pane;
			});
		}
		return panes;
	};

	const getPanesForColumn = (columnIndex: number) =>
		panes().filter((pane) => pane.column === columnIndex);

	const handleClosePane = (paneId: string) => {
		const remainingPanes = panes().filter(
			(pane) => pane.id.toString() !== paneId,
		);
		const nonEmptyColumns = new Set(remainingPanes.map((pane) => pane.column));
		const newPanes = remainingPanes.map((pane) => ({
			...pane,
			column: [...nonEmptyColumns].indexOf(pane.column),
		}));
		setPanes(newPanes);
		setColumns(nonEmptyColumns.size);
	};

	const handleResizePane = (index: number, newHeight: string) => {
		const updatedPanes = panes().map((pane) =>
			pane.id === index
				? { ...pane, height: newHeight, collapsed: false }
				: pane,
		);

		const columnIndex = updatedPanes.find((pane) => pane.id === index)?.column;
		const adjustedPanes = adjustPaneHeights(updatedPanes, columnIndex);

		setPanes(adjustedPanes);
	};

	const toggleCollapsePane = (paneId: string) => {
		const updatedPanes = panes().map((pane) => {
			if (pane.id.toString() === paneId) {
				const newHeight = pane.collapsed ? pane.previousHeight : "0px";
				return {
					...pane,
					collapsed: !pane.collapsed,
					height: newHeight,
					previousHeight: pane.collapsed ? pane.previousHeight : pane.height,
				};
			}
			return pane;
		});
		setPanes(updatedPanes);
	};

	return (
		<div
			class={styles["left-sidebar"]}
			style={{ display: "flex", "flex-direction": "row", height: "100%" }}
		>
			<For each={Array.from({ length: columns() })}>
				{(_, columnIndex) => (
					<div
						class={`${styles["pane-list"]} ${
							dropTarget() === columnIndex() ? styles["drop-target"] : ""
						} ${columnIndex() === 0 ? styles["first-column"] : ""}`}
						onDragOver={(e) => handleDragOver(e, columnIndex())}
						onDrop={(e) => handleDrop(e, columnIndex())}
					>
						<For each={getPanesForColumn(columnIndex())}>
							{(pane) => (
								<Pane
									index={pane.id}
									title={pane.name}
									icon={pane.icon}
									style={{ ...pane.style }}
									height={pane.height.toString()}
									collapsed={pane.collapsed}
									onToggleCollapse={() =>
										toggleCollapsePane(pane.id.toString())
									}
									onDragStart={(e) => handleDragStart(e, pane.id)}
									onDragEnd={handleDragEnd}
									onDragOver={(e) => handleDragOver(e, columnIndex())}
									onDrop={(e) => handleDrop(e, columnIndex())}
									onClose={() => handleClosePane(pane.id.toString())}
									onResize={handleResizePane}
									childStyle={{
										...pane.childStyle,
									}}
								>
									{pane.component({})}
								</Pane>
							)}
						</For>
					</div>
				)}
			</For>
			{isDragging() && columns() < MAX_COLUMNS && (
				<div
					class={`${styles["new-column-area"]} ${
						dropTarget() === columns() ? styles["drop-target"] : ""
					}`}
					onDragOver={(e) => handleDragOver(e, columns())}
					onDrop={(e) => handleDrop(e, columns())}
				>
					<TbPlus font-size="36" />
				</div>
			)}
		</div>
	);
};

export default LeftSidebar;
