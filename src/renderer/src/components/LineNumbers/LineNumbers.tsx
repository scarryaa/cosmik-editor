import { lineHeight } from "@renderer/const/const";
import type { Editor } from "@renderer/models/Editor";
import type { Accessor, Component } from "solid-js";
import styles from "./LineNumbers.module.scss";

interface LineNumbersProps {
	editor: Accessor<Editor>;
	top: Accessor<number>;
}

const LineNumbers: Component<LineNumbersProps> = (props: LineNumbersProps) => {
	return (
		<div class={styles["line-numbers"]} style={`top: ${-props.top()}px;`}>
			<div class={styles["line-numbers-inner"]}>
				{props
					.editor()
					.getText()
					.split("\n")
					.map((_, index) => (
						// biome-ignore lint/correctness/useJsxKeyInIterable: Not needed
						<div
							style={`top: ${index * lineHeight}px;`}
							class={
								styles["line-number"] +
								(index === props.editor().cursorAt(0).line
									? ` ${styles.active}`
									: "")
							}
						>
							{index + 1}
						</div>
					))}
			</div>
		</div>
	);
};

export default LineNumbers;
