import { VsFiles, VsSearch } from "solid-icons/vs";
import { For, batch, createEffect, createSignal, onCleanup } from "solid-js";
import Pane from "../Pane/Pane";
import Explorer from "./Explorer/Explorer";
import styles from "./LeftSidebar.module.scss";
import Search from "./Search/Search";

const LeftSidebar = () => {
	const [draggingIndex, setDraggingIndex] = createSignal<number | null>(null);
	const [placeholderIndex, setPlaceholderIndex] = createSignal<number | null>(
		null,
	);
	const [panes, setPanes] = createSignal([
		{
			name: "Explorer",
			component: Explorer,
			childStyle: { minHeight: "50px" },
			style: {
				width: "165px",
				"min-width": "165px",
				"margin-block": "2px",
				"margin-top": "4px",
				"margin-inline": "4px",
				"border-radius": "4px",
				display: "flex",
				"flex-direction": "column" as any["flex-direction"],
				"background-color": "var(--meteor-pane-background)",
			} as any,
			icon: <VsFiles font-size="18" />,
		},
		{
			name: "Search",
			component: Search,
			childStyle: { minHeight: "50px" },
			style: {
				width: "165px",
				"min-width": "165px",
				"margin-block": "2px",
				"margin-top": "4px",
				"margin-inline": "4px",
				"border-radius": "4px",
				display: "flex",
				"flex-direction": "column" as any["flex-direction"],
				"background-color": "var(--meteor-pane-background)",
			} as any,
			icon: <VsSearch font-size="18" />,
		},
	]);

	const resizeHandleHeight = 58;
	const minPaneHeight = 50;

	const handleDragStart = (index: number) => (e: DragEvent) => {
		setDraggingIndex(index);
		e.dataTransfer!.effectAllowed = "move";
		e.dataTransfer!.setData("text/plain", index.toString());

		const dragImage = document.createElement("div");
		dragImage.classList.add(styles["drag-image"]);
		dragImage.textContent = panes()[index].name;

		// Append to the body (or another suitable container)
		document.body.appendChild(dragImage);
		e.dataTransfer!.setDragImage(dragImage, 0, 0);
	};

	const handleDragOver = (index: number) => (e: DragEvent) => {
		e.preventDefault();
		setPlaceholderIndex(index);
	};

	const handleDrop = (index: number) => (e: DragEvent) => {
		e.preventDefault();
		batch(() => {
			const newPanes = [...panes()];
			const draggedIndex = draggingIndex();
			if (draggedIndex !== null) {
				const [draggedPane] = newPanes.splice(draggedIndex, 1);
				newPanes.splice(index, 0, draggedPane);
				setPanes(newPanes);
				setDraggingIndex(null);
				setPlaceholderIndex(null);
			}
		});
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

			// 1. Calculate the maximum allowable height for the resized pane
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

			// 2. Ensure the resized pane's height is within bounds
			newHeight = Math.min(Math.max(newHeight, minPaneHeight), maxHeight);

			// 3. Update the resized pane
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
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener when the component is unmounted
        onCleanup(() => window.removeEventListener('resize', handleResize));
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
