import { initWithPrefix, isOpen } from "@renderer/stores/command-palette";
import {
	type Component,
	For,
	Show,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import styles from "./CommandPalette.module.scss";

interface Command {
	id: number;
	label: string;
	action: () => void;
	prefix?: boolean;
}

interface CommandPaletteProps {
	commands: Command[];
	isOpen: boolean;
	onClose: () => void;
}

const CommandPalette: Component<CommandPaletteProps> = (props) => {
	const [query, setQuery] = createSignal("");
	const [selectedIndex, setSelectedIndex] = createSignal(0);
	let inputRef!: HTMLInputElement;

	const filteredCommands = () => {
		const queryText = query().toLowerCase();

		if (queryText.startsWith(">")) {
			// If query starts with ">", only show prefixed commands
			const trimmedQuery = queryText.slice(1).trim();
			return props.commands.filter(
				(command) =>
					command.prefix && command.label.toLowerCase().includes(trimmedQuery),
			);
		}

		// Otherwise, show all matching commands (with or without prefix)
		return props.commands.filter((command) =>
			command.label.toLowerCase().includes(queryText),
		);
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!props.isOpen) return;

		if (e.key === "ArrowDown") {
			setSelectedIndex((prev) =>
				Math.min(prev + 1, filteredCommands().length - 1),
			);
		} else if (e.key === "ArrowUp") {
			setSelectedIndex((prev) => Math.max(prev - 1, 0));
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (filteredCommands().length > 0) {
				filteredCommands()[selectedIndex()].action();
				props.onClose();
			}
		} else if (e.key === "Escape") {
			props.onClose();
		}
	};

	createEffect(() => {
		if (initWithPrefix() && isOpen()) {
			setQuery(">");
		}
	});

	onCleanup(() => {
		document.removeEventListener("keydown", handleKeyDown);
	});

	onMount(() => {
		if (inputRef) {
			inputRef.focus();
		}
		document.addEventListener("keydown", handleKeyDown);
	});

	createEffect(() => {
		if (props.isOpen && inputRef) {
			setTimeout(() => inputRef.focus(), 0);
		} else {
			setQuery("");
			setSelectedIndex(0);
		}
	});

	return (
		<Show when={props.isOpen}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Not needed */}
			<div class={styles.overlay} onClick={props.onClose}>
				<div
					class={styles.commandPalette}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
				>
					<input
						ref={inputRef}
						autofocus
						type="text"
						class={styles.searchInput}
						placeholder="Type a command..."
						value={query()}
						onInput={(e) => setQuery(e.currentTarget.value)}
					/>
					<ul class={styles.commandList}>
						<For each={filteredCommands()}>
							{(command, index) => (
								<li
									class={
										index() === selectedIndex() ? styles.selectedCommand : ""
									}
									onClick={() => {
										command.action();
										props.onClose();
									}}
									onKeyPress={(e) => {
										if ((e.key === "Enter" || e.key === " ") && props.isOpen) {
											command.action();
											props.onClose();
										}
									}}
								>
									{command.label}
								</li>
							)}
						</For>
					</ul>
				</div>
			</div>
		</Show>
	);
};

export default CommandPalette;
