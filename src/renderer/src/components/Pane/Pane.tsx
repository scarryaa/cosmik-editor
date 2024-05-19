import { VsChevronDown, VsChevronUp, VsClose } from "solid-icons/vs";
import { type Component, type JSXElement, onCleanup } from "solid-js";
import styles from "./Pane.module.scss";

interface PaneProps {
	children: JSXElement;
	style?: object;
	onDragStart?: (e: DragEvent) => void;
	onDragOver?: (e: DragEvent) => void;
	onDrop?: (e: DragEvent) => void;
	onDragEnd?: (e: DragEvent) => void;
	onClose: (index: number) => void;
	onToggleCollapse: () => void;
	collapsed?: boolean;
	index: number;
	title?: string;
	icon: Component;
	childStyle?: object;
	height: string;
	onResize: (index: number, newHeight: string) => void;
}

const Pane: Component<PaneProps> = (props: PaneProps) => {
	let container: HTMLDivElement | null = null;

	const handleMouseDown = (e: MouseEvent) => {
		const startY = e.clientY;
		const startHeight = container ? container.clientHeight : 0;

		const doDrag = (e: MouseEvent) => {
			const newHeight = `${startHeight + e.clientY - startY}px`;
			props.onResize(props.index, newHeight);
		};

		const stopDrag = () => {
			document.documentElement.removeEventListener("mousemove", doDrag, false);
			document.documentElement.removeEventListener("mouseup", stopDrag, false);
		};

		document.documentElement.addEventListener("mousemove", doDrag, false);
		document.documentElement.addEventListener("mouseup", stopDrag, false);

		onCleanup(() => {
			document.documentElement.removeEventListener("mousemove", doDrag, false);
			document.documentElement.removeEventListener("mouseup", stopDrag, false);
		});
	};

	return (
		<div
			id={props.title}
			class={styles["pane-container"]}
			style={{ ...props.style, height: props.height }}
			// biome-ignore lint/suspicious/noAssignInExpressions: Ignore
			ref={(el) => (container = el)}
		>
			<div
				class={styles["pane-title"]}
				draggable="true"
				onDragStart={props.onDragStart}
				onDragOver={props.onDragOver}
				onDrop={props.onDrop}
				onDragEnd={props.onDragEnd}
			>
				<props.icon />
				<h2>{props.title}</h2>
				<div class={styles["buttons-container"]}>
					<button
						type="button"
						class={`${styles["collapse-button"]} no-button-style`}
						onClick={props.onToggleCollapse}
					>
						{props.collapsed ? <VsChevronUp /> : <VsChevronDown />}
					</button>
					<button
						type="button"
						class={`${styles["close-button"]} no-button-style`}
						onClick={() => props.onClose(props.index)}
					>
						<VsClose />
					</button>
				</div>
			</div>
			{!props.collapsed && (
				<div
					style={{
						...props.childStyle,
					}}
					class={styles["pane-content"]}
				>
					{props.children}
				</div>
			)}
			<div class={styles["resize-handle"]} onMouseDown={handleMouseDown} />
		</div>
	);
};

export default Pane;
