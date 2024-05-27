import { createSignal, onCleanup, Show, onMount } from "solid-js";
import type { Component, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import styles from "./ContextMenu.module.scss";

export interface MenuItem {
	label: string;
	action?: () => void;
	subItems?: MenuItem[];
}

interface ContextMenuProps {
	items: MenuItem[];
	children: JSX.Element;
}

const ContextMenu: Component<ContextMenuProps> = (props) => {
	const [isVisible, setIsVisible] = createSignal(false);
	const [position, setPosition] = createSignal({ x: 0, y: 0 });
	const [subMenuPosition, setSubMenuPosition] = createSignal({ x: 0, y: 0 });
	const [activeSubMenu, setActiveSubMenu] = createSignal<MenuItem | null>(null);
	const [focusedIndex, setFocusedIndex] = createSignal<number | null>(null);
	const [subMenuFocusedIndex, setSubMenuFocusedIndex] = createSignal<
		number | null
	>(null);

	let menuRef: HTMLDivElement | undefined;
	let subMenuRef: HTMLDivElement | undefined;

	const handleContextMenu = (e: MouseEvent) => {
		e.preventDefault();
		setPosition({ x: e.pageX, y: e.pageY });
		setIsVisible(true);
		setFocusedIndex(0);
		document.addEventListener("click", handleClickOutside);
	};

	const handleClickOutside = () => {
		setIsVisible(false);
		setActiveSubMenu(null);
		document.removeEventListener("click", handleClickOutside);
	};

	const handleMouseEnter = (e: MouseEvent, item: MenuItem) => {
		if (item.subItems) {
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			setSubMenuPosition({ x: rect.right, y: rect.top });
			setActiveSubMenu(item);
			setSubMenuFocusedIndex(0);
		} else {
			setActiveSubMenu(null);
			setSubMenuFocusedIndex(null);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!isVisible()) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				if (activeSubMenu()) {
					setSubMenuFocusedIndex((i) =>
						i === null || i >= activeSubMenu()!.subItems!.length - 1
							? 0
							: i + 1,
					);
				} else {
					setFocusedIndex((i) =>
						i === null || i >= props.items.length - 1 ? 0 : i + 1,
					);
				}
				break;
			case "ArrowUp":
				e.preventDefault();
				if (activeSubMenu()) {
					setSubMenuFocusedIndex((i) =>
						i === null || i <= 0
							? activeSubMenu()!.subItems!.length - 1
							: i - 1,
					);
				} else {
					setFocusedIndex((i) =>
						i === null || i <= 0 ? props.items.length - 1 : i - 1,
					);
				}
				break;
			case "ArrowRight":
				if (focusedIndex() !== null && props.items[focusedIndex()!].subItems) {
					setActiveSubMenu(props.items[focusedIndex()!]);
					setSubMenuFocusedIndex(0);
				}
				break;
			case "ArrowLeft":
				if (activeSubMenu()) {
					setActiveSubMenu(null);
					setFocusedIndex(focusedIndex());
				}
				break;
			case "Enter":
				if (activeSubMenu()) {
					const subItem = activeSubMenu()!.subItems![subMenuFocusedIndex()!];
					subItem.action?.();
					setIsVisible(false);
				} else if (focusedIndex() !== null) {
					const item = props.items[focusedIndex()!];
					if (item.subItems) {
						setActiveSubMenu(item);
						setSubMenuFocusedIndex(0);
					} else {
						item.action?.();
						setIsVisible(false);
					}
				}
				break;
			case "Escape":
				setIsVisible(false);
				setActiveSubMenu(null);
				break;
		}
	};

	onCleanup(() => {
		document.removeEventListener("click", handleClickOutside);
		document.removeEventListener("keydown", handleKeyDown);
	});

	onMount(() => {
		document.addEventListener("keydown", handleKeyDown);
	});

	return (
		<>
			<div onContextMenu={handleContextMenu} class={styles.contextMenuWrapper}>
				{props.children}
			</div>
			<Portal>
				<Show when={isVisible()}>
					<div
						ref={menuRef}
						class={styles.contextMenu}
						style={{ top: `${position().y}px`, left: `${position().x}px` }}
					>
						{props.items.map((item, index) => (
							<div
								class={`${styles.contextMenuItem} ${
									focusedIndex() === index ? styles.focused : ""
								}`}
								onClick={() => {
									item.action?.();
									setIsVisible(false);
								}}
								onMouseEnter={(e) => handleMouseEnter(e, item)}
							>
								{item.label}
								<Show when={item.subItems}>
									<span class={styles.subMenuArrow}>▶</span>
								</Show>
							</div>
						))}
					</div>
				</Show>

				<Show when={activeSubMenu()}>
					<div
						ref={subMenuRef}
						class={styles.contextMenu}
						style={{
							top: `${subMenuPosition().y}px`,
							left: `${subMenuPosition().x}px`,
						}}
					>
						{activeSubMenu()!.subItems!.map((subItem, index) => (
							<div
								class={`${styles.contextMenuItem} ${
									subMenuFocusedIndex() === index ? styles.focused : ""
								}`}
								onClick={() => {
									subItem.action?.();
									setIsVisible(false);
								}}
							>
								{subItem.label}
							</div>
						))}
					</div>
				</Show>
			</Portal>
		</>
	);
};

export default ContextMenu;
