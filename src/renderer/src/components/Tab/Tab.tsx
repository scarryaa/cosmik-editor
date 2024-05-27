import TabStore, { TabState } from "@renderer/stores/tabs";
import { VsClose } from "solid-icons/vs";
import { type Component, createSignal } from "solid-js";
import styles from "./Tab.module.scss";
import ContextMenu, { type MenuItem } from "../ContextMenu/ContextMenu";

interface TabProps {
	icon?: string;
	id: string;
	name: string;
	active?: boolean;
	state?: TabState;
	saved?: boolean;
	onclick?: (e: MouseEvent) => void;
	oncloseclick?: (e: MouseEvent) => void;
}

const Tab: Component<TabProps> = (props: TabProps) => {
	const [hovered, setHovered] = createSignal(false);
	const [buttonHovered, setButtonHovered] = createSignal(false);
	const [savedIconHovered, setSavedIconHovered] = createSignal(false);

	const items: MenuItem[] = [
		{
			label: "Close",
			action: () => props.oncloseclick?.(new MouseEvent("click")),
		},
		{
			label: "Close Others",
			action: () => TabStore.closeOtherTabs(props.id),
		},
		{
            label: "Close All",
            action: () => TabStore.closeAllTabs(),
        },
	];

	return (
		<ContextMenu items={items}>
			<div
				class={`${styles["tab-container"]}`}
				onclick={props.onclick}
				onmouseenter={() => setHovered(true)}
				onmouseleave={() => setHovered(false)}
				onmousedown={(e) => {
					if (e.button === 1) props.oncloseclick?.(e);
				}}
			>
				<button
					class={`${styles.tab} no-button-style ${
						props.active ? styles.active : ""
					}`}
					type="button"
					style={!props.saved ? { "padding-right": "22px" } : {}}
				>
					<div class={styles["tab-icon"]}>{props.icon}</div>
					<div
						class={styles["tab-name"]}
						style={
							props.state === TabState.Modified
								? { color: "var(--tab-modified-color)" }
								: {}
						}
					>
						{props.name}
					</div>
					<div
						class={styles["saved-indicator-wrapper"]}
						onmouseenter={() => setSavedIconHovered(true)}
						onmouseleave={() => setSavedIconHovered(false)}
					>
						<span
							class={styles["saved-indicator"]}
							style={props.saved ? { opacity: 0 } : ""}
						/>
					</div>
					{props.state === TabState.Modified && (
						<div class={styles["modified-indicator-wrapper"]}>
							<span class={styles["modified-indicator"]}>M</span>
						</div>
					)}
					{((props.saved && hovered()) ||
						savedIconHovered() ||
						buttonHovered() ||
						(props.active && props.saved)) && (
						<button
							onmouseenter={() => setButtonHovered(true)}
							onmouseleave={() => setButtonHovered(false)}
							onclick={props.oncloseclick}
							class={`${styles["close-button"]} no-button-style`}
							type="button"
						>
							<VsClose font-size="14" class={styles["close-button-icon"]} />
						</button>
					)}
				</button>
			</div>
		</ContextMenu>
	);
};

export default Tab;
