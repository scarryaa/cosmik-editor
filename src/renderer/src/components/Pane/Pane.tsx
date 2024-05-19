import { VsChevronDown, VsChevronUp, VsClose } from "solid-icons/vs";
import { type Component, type JSXElement, createSignal } from "solid-js";
import styles from "./Pane.module.scss";

interface PaneProps {
	children: JSXElement;
	style?: object;
	onDragStart?: (e: DragEvent) => void;
	onDragOver?: (e: DragEvent) => void;
	onDrop?: (e: DragEvent) => void;
	onDragEnd?: (e: DragEvent) => void;
	title?: string;
	icon?: JSXElement;
	childStyle?: object;
}

const Pane: Component<PaneProps> = (props: PaneProps) => {
	const [collapsed, setCollapsed] = createSignal(false);

	const toggleCollapse = () => {
		const newCollapsed = !collapsed();
		setCollapsed(newCollapsed);
	};

	return (
		<div
			id={props.title}
			class={styles["pane-container"]}
		>
			<div
				class={styles["pane-title"]}
				draggable="true"
				onDragStart={props.onDragStart}
				onDragOver={props.onDragOver}
				onDrop={props.onDrop}
				onDragEnd={props.onDragEnd}
			>
				{props.icon}
				<h2>{props.title}</h2>
				<div class={styles["buttons-container"]}>
					<button
						type="button"
						class={`${styles["collapse-button"]} no-button-style`}
						onclick={toggleCollapse}
					>
						{collapsed() ? <VsChevronUp /> : <VsChevronDown />}
					</button>
					<button
						type="button"
						class={`${styles["close-button"]} no-button-style`}
					>
						<VsClose />
					</button>
				</div>
			</div>
			{!collapsed() && (
				<div
					style={{
						...props.childStyle,
					}}
					class={styles["pane-content"]}
				>
					{props.children}
				</div>
			)}
		</div>
	);
};

export default Pane;
