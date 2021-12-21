#!/usr/bin/env node
const { Workers, event } = require("codeceptjs");

const workerConfig = {
	testConfig: "./codecept.conf.js",
};

// don't initialize workers in constructor
const workers = new Workers(null, workerConfig);
// split tests by suites in 2 groups
const testGroups = workers.createGroupsOfSuites(2);

const browsers = [
	{
		browser: "chrome", // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
		os: "osx",
		os_version: "catalina",
		name: "My first playwright test chrome",
		build: "playwright-build-1",
		"browserstack.username": process.env.BROWSERSTACK_USERNAME,
		"browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,
		"client.playwrightVersion": "1.17.1", // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
	},
	{
		browser: "edge", // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
		os: "osx",
		os_version: "catalina",
		name: "My first playwright test edge",
		build: "playwright-build-1",
		"browserstack.username": process.env.BROWSERSTACK_USERNAME,
		"browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,
		"client.playwrightVersion": "1.17.1", // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
	},
];

const configs = browsers.map((browser) => {
	return {
		helpers: {
			Playwright: {
				url: "https://google.com",
				show: true,
				browser: "chromium",
				chromium: {
					browserWSEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
						JSON.stringify(browser)
					)}`,
				},
			},
		},
	};
});

for (const config of configs) {
	for (group of testGroups) {
		const worker = workers.spawn();
		worker.addTests(group);
		worker.addConfig(config);
	}
}

// Listen events for failed test
workers.on(event.test.failed, (failedTest) => {
	console.log("Failed : ", failedTest.title);
});

// Listen events for passed test
workers.on(event.test.passed, (successTest) => {
	console.log("Passed : ", successTest.title);
});

// test run status will also be available in event
workers.on(event.all.result, () => {
	// Use printResults() to display result with standard style
	workers.printResults();
});

// run workers as async function
runWorkers();

async function runWorkers() {
	try {
		// run bootstrapAll
		await workers.bootstrapAll();
		// run tests
		await workers.run();
	} finally {
		// run teardown All
		await workers.teardownAll();
	}
}
