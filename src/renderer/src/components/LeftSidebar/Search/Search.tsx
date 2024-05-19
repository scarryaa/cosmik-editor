import { type Component, createSignal } from "solid-js";
import styles from "./Search.module.scss";

const Search: Component = () => {
	const [collapsed, setCollapsed] = createSignal(false);

	const handleCollapseClick = () => {
		setCollapsed(!collapsed());
	};

	return (
		<div class={styles["search-container"]}>
			Content
		</div>
	);
};

export default Search;
