import { createSignal, onCleanup, type Component, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
	children: JSX.Element;
	position?: "top" | "bottom" | "left" | "right";
	content: string;
	hideDelay?: number;
	showDelay?: number;
}

const Tooltip: Component<TooltipProps> = (props: TooltipProps) => {
	const [visible, setVisible] = createSignal(false);
	const [position, setPosition] = createSignal({ top: 0, left: 0 });
	let showTimeoutId: NodeJS.Timeout;
	let hideTimeoutId: NodeJS.Timeout;
	let shouldUpdatePosition = true;

	const updatePosition = (event: MouseEvent) => {
		if (shouldUpdatePosition) {
			setPosition({
				top: event.clientY + 10,
				left: event.clientX + 15,
			});
		}
	};

	const showTooltip = (event: MouseEvent) => {
		clearTimeout(hideTimeoutId);
		const delay = props.showDelay || 0;
		updatePosition(event);
		showTimeoutId = setTimeout(() => {
			setVisible(true);
			shouldUpdatePosition = false;
		}, delay);
	};

	const hideTooltip = () => {
		clearTimeout(showTimeoutId);
		const delay = props.hideDelay || 0;
		hideTimeoutId = setTimeout(() => {
			setVisible(false);
			shouldUpdatePosition = true;
		}, delay);
	};

	const handleClick = () => {
		clearTimeout(showTimeoutId);
		clearTimeout(hideTimeoutId);
		setVisible(false);
	};

	onCleanup(() => {
		clearTimeout(showTimeoutId);
		clearTimeout(hideTimeoutId);
	});

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Not needed
		<div
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onFocus={(e) => showTooltip(e as unknown as MouseEvent)}
			onMouseMove={updatePosition}
			onClick={handleClick}
			onBlur={hideTooltip}
		>
			{props.children}
			<Portal>
				<div
					class={`${styles.tooltip} ${!visible() ? styles.hidden : ""}`}
					style={{
						top: `${position().top}px`,
						left: `${position().left}px`,
						position: "fixed",
					}}
				>
					{props.content}
				</div>
			</Portal>
		</div>
	);
};

export default Tooltip;
