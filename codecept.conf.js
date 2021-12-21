const { setHeadlessWhen } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

const caps = {
	browser: "chrome", // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
	os: "osx",
	os_version: "catalina",
	name: "My first playwright test",
	build: "playwright-build-1",
	"browserstack.username": process.env.BROWSERSTACK_USERNAME,
	"browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,
	"client.playwrightVersion": "1.17.1", // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
};

exports.config = {
	tests: "./tests/*_test.js",
	output: "./output",
	include: {
		I: "./steps_file.js",
	},
	bootstrap: null,
	mocha: {},
	name: "codeceptjs",
	plugins: {
		pauseOnFail: {},
		retryFailedStep: {
			enabled: true,
		},
		tryTo: {
			enabled: true,
		},
		screenshotOnFail: {
			enabled: true,
		},
	},
};
