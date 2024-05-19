import { panes, setPanes } from "@renderer/stores/panes";
import { For, batch, createEffect, createSignal, onCleanup } from "solid-js";
import Pane from "../Pane/Pane";
import styles from "./LeftSidebar.module.scss";

const LeftSidebar = () => {
	const [draggingIndex, setDraggingIndex] = createSignal<number | null>(null);
	const [placeholderIndex, setPlaceholderIndex] = createSignal<number | null>(
		null,
	);
	const [columns, setColumns] = createSignal(2);
	const getPanesForColumn = (columnIndex: number) =>
		panes().filter((_, index) => index % columns() === columnIndex);

	const resizeHandleHeight = 58;
	const minPaneHeight = 50;

	const onClose = (index: number) => () => {
		const newPanes = [...panes()];
		newPanes.splice(index, 1);
		setPanes(newPanes);
	};

	const handleDragStart =
		(index: number) => (e: DragEvent) => {
			setDraggingIndex(index);
			e.dataTransfer!.effectAllowed = "move";
			e.dataTransfer!.setData(
                "text/plain",
                `${index}-${Math.floor(index / columns())}`,
            );

			const dragImage = document.createElement("div");
			dragImage.classList.add(styles["drag-image"]);
			dragImage.textContent = panes()[index].name;

			// Append to the body
			document.body.appendChild(dragImage);
			e.dataTransfer!.setDragImage(dragImage, 0, 0);
		};

	const handleDragOver = (index: number) => (e: DragEvent) => {
		e.preventDefault();
		setPlaceholderIndex(index);
	};

	const handleDrop = (index: number) => (e: DragEvent) => {
		e.preventDefault();
		const data = e.dataTransfer!.getData("text/plain").split("-");
		const [draggedIndex, draggedColumnIndex] = [
			Number.parseInt(data[0]),
			Number.parseInt(data[1]),
		];

		if (draggedIndex !== null && draggedColumnIndex !== null) {
			batch(() => {
				const newPanes = [...panes()];
				const [draggedPane] = newPanes.splice(
					draggedIndex +
						draggedColumnIndex * Math.ceil(panes().length / columns()),
					1,
				);
				newPanes.splice(
					index * Math.ceil(panes().length / columns()),
					0,
					draggedPane,
				);
				setPanes(newPanes);
				setDraggingIndex(null);
				setPlaceholderIndex(null);
			});
		}
	};

	const handleDragEnd = () => {
		setDraggingIndex(null);
		setPlaceholderIndex(null);
	};

	const calculateTotalHeight = () => {
		return panes().reduce((total, pane) => {
			const minHeight = Number.parseInt(pane.childStyle?.minHeight || "0", 10);
			return Number.isNaN(minHeight) ? total : total + minHeight;
		}, 0);
	};

	const handleResizeStart = (index: number, e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const startY = e.clientY;
		const startHeight = (e.target as HTMLElement).parentElement!.offsetHeight;
		const onMouseMove = (moveEvent: MouseEvent) => {
			const deltaY = moveEvent.clientY - startY;
			let newHeight = startHeight + deltaY;

			const totalOtherPanesHeight = panes().reduce(
				(sum, pane, idx) =>
					idx !== index
						? sum +
							(Number.parseInt(pane.childStyle?.height || "0") || 0) +
							resizeHandleHeight
						: sum,
				0,
			);
			const maxHeight =
				window.innerHeight - totalOtherPanesHeight - resizeHandleHeight;

			newHeight = Math.min(Math.max(newHeight, minPaneHeight), maxHeight);

			setPanes(
				panes().map((pane, idx) => {
					if (idx === index) {
						return {
							...pane,
							childStyle: {
								...pane.childStyle,
								minHeight: `${newHeight}px`,
								height: `${newHeight}px`,
							},
						};
					}
					return pane;
				}),
			);
		};

		const onMouseUp = () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);

			adjustPaneHeights();
		};

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};

	const adjustPaneHeights = () => {
		const totalHeight = calculateTotalHeight();
		const windowHeight = window.innerHeight;

		if (totalHeight > windowHeight) {
			const scaleFactor = windowHeight / totalHeight;
			setPanes(
				panes().map((pane) => {
					const currentHeight = Number.parseInt(
						pane.childStyle?.minHeight || "0",
						10,
					);
					const newHeight = Math.floor(currentHeight * scaleFactor);
					return {
						...pane,
						childStyle: {
							...pane.childStyle,
							minHeight: `${newHeight}px`,
							height: `${newHeight}px`,
						},
						style: {
							...pane.style,
							minHeight: `${newHeight + 40}px`,
						},
					};
				}),
			);
		}
	};

	createEffect(() => {
		const dragging = draggingIndex() !== null;
		if (dragging) {
			document.body.classList.add("dragging");
		} else {
			document.body.classList.remove("dragging");
		}
	});

	createEffect(() => {
		adjustPaneHeights();

		const handleResize = () => adjustPaneHeights();
		window.addEventListener("resize", handleResize);

		onCleanup(() => window.removeEventListener("resize", handleResize));
	});

	return (
		<div style={{ display: "flex", "flex-direction": "column" }}>
			<ul class={styles["pane-list"]} onDragOver={(e) => e.preventDefault()}>
				<For each={panes()}>
					{(pane, index) => (
						<li
							class={styles["pane-item"]}
							classList={{
								[styles.dragging]: index() === draggingIndex(),
								placeholder: index() === placeholderIndex(),
							}}
							style={{ ...pane.style }}
							onDragOver={handleDragOver(index())}
							onDrop={handleDrop(index())}
							onDragEnd={handleDragEnd}
						>
							<Pane
								icon={pane.icon}
								title={pane.name}
								childStyle={pane.childStyle}
								onDragStart={handleDragStart(index())}
								onDragOver={handleDragOver(index())}
								onDrop={handleDrop(index())}
								onDragEnd={handleDragEnd}
								index={index()}
								onClose={() => onClose(index())}
							>
								{pane.component({})}
							</Pane>
							<div
								class={styles["resize-handle"]}
								onMouseDown={(e) => handleResizeStart(index(), e)}
							/>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
};

export default LeftSidebar;
