import path, { resolve } from "node:path";
import solidjs from "vite-plugin-solid";

export default {
	plugins: [solidjs()],
	test: {
		globals: true,
		environment: "jsdom",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@renderer": resolve("src/renderer/src"),
		},
	},
};
