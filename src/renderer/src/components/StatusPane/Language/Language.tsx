import {
	setContentToLanguages,
	setIsOpen,
} from "@renderer/stores/command-palette";
import { selectedLanguage } from "@renderer/stores/language-selections";
import type { Component } from "solid-js";
import styles from "./Language.module.scss";

const Language: Component = () => {
	const handleLanguageClick = (): void => {
		setContentToLanguages();
		setIsOpen(true);
	};

	const handleKeypress = (e: KeyboardEvent): void => {
		if (e.key === "Space" || e.key === "Enter") {
			setContentToLanguages();
			setIsOpen(true);
		}
	};

	return (
		<div
			class={styles.language}
			onClick={handleLanguageClick}
			onKeyPress={handleKeypress}
		>
			{selectedLanguage()}
		</div>
	);
};

export default Language;
