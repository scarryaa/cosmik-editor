import { createEffect } from "solid-js";
import { setFileContent } from "../../../stores/files";

const Explorer = () => {
	createEffect(() => {
		(
			window.api as {
				onFileOpened: (callback: (event: unknown, response: string) => void) => void;
			}
		).onFileOpened((event, response) => {
            setFileContent(response);
		});
	});

	return (
		<div>
			<h2>Explorer</h2>
		</div>
	);
};

export default Explorer;
