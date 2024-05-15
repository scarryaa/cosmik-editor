import type { Component, JSXElement } from "solid-js";
import styles from "./Pane.module.scss";

interface PaneProps {
    children: JSXElement;
    style?: object;
}

const Pane: Component<PaneProps> = (props: PaneProps) => {
    return (
        <div style={{ ...props.style }} class={styles["pane-container"]}>
            {props.children}
        </div>
    );
};

export default Pane;
