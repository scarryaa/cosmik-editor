import type { Component, JSXElement } from "solid-js";
import styles from "./PaneButton.module.scss";

interface ButtonProps {
	icon: JSXElement;
	onclick?: () => void;
	style?: object;
	active?: boolean;
}

const PaneButton: Component<ButtonProps> = (props: ButtonProps) => {
	return (
		<button
			style={{ ...props.style }}
			class={`${styles["pane-button"]} no-button-style ${
				props.active ? styles.active : ""
			} `}
			onclick={props.onclick}
			type="button"
		>
			<div class={styles["pane-button-icon"]}>{props.icon}</div>
		</button>
	);
};

export default PaneButton;
