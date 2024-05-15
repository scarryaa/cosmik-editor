import {
	VsDebugAlt,
	VsExtensions,
	VsFiles,
	VsSearch,
	VsSourceControl,
} from "solid-icons/vs";
import { For, Match, Switch, createSignal } from "solid-js";
import Pane from "../Pane/Pane";
import PaneButton from "../PaneButton/PaneButton";
import Explorer from "./Explorer/Explorer";
import Extensions from "./Extensions/Extensions";
import styles from "./LeftSidebar.module.scss";
import RunAndDebug from "./RunAndDebug/RunAndDebug";
import Search from "./Search/Search";
import SourceControl from "./SourceControl/SourceControl";

const LeftSidebar = () => {
	const [selectedPane, setSelectedPane] = createSignal("explorer");

	const paneItems = [
		{ key: "explorer", icon: <VsFiles font-size="18" /> },
		{ key: "search", icon: <VsSearch font-size="18" /> },
		{ key: "source-control", icon: <VsSourceControl font-size="18" /> },
		{ key: "run-and-debug", icon: <VsDebugAlt font-size="18" /> },
		{ key: "extensions", icon: <VsExtensions font-size="18" /> },
	];

	const renderTabs = () => (
		<div class={styles["tabs-container"]}>
			<For each={paneItems}>
				{(item) => (
					<PaneButton
						style={{
							"padding-top": "8px",
							"padding-bottom": "2px",
							"border-bottom":
								selectedPane() === item.key
									? "2px solid var(--meteor-focus-bar)"
									: "2px solid transparent",
						}}
						icon={item.icon}
						active={selectedPane() === item.key}
						onclick={() => setSelectedPane(item.key)}
					/>
				)}
			</For>
		</div>
	);

	return (
		<Pane
			style={{
				width: "165px",
				height: "100%",
				"background-color": "var(--meteor-pane-background",
			}}
		>
			{renderTabs()}
			<Switch>
				<Match when={selectedPane() === "explorer"}>
					<Explorer />
				</Match>
				<Match when={selectedPane() === "search"}>
					<Search />
				</Match>
				<Match when={selectedPane() === "source-control"}>
					<SourceControl />
				</Match>
				<Match when={selectedPane() === "run-and-debug"}>
					<RunAndDebug />
				</Match>
				<Match when={selectedPane() === "extensions"}>
					<Extensions />
				</Match>
			</Switch>
		</Pane>
	);
};

export default LeftSidebar;
