export default {
	use: {
		testDir: "e2e",
		baseURL: "https://scarryaa.github.io/meteor/",
		headless: true,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
	},
	projects: [
		{
			name: "chromium",
			use: { browserName: "chromium" },
		},
		{
			name: "firefox",
			use: { browserName: "firefox" },
		},
		{
			name: "webkit",
			use: { browserName: "webkit" },
		},
	],
};
