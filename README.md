# codeceptjs-playwright-browserstack

This repo demonstrates how to run multiple tests in parallel across different browser and os combination using codeceptjs and playwright on BrowserStack

## Dependencies

-   Node version >= 11.7

## Steps

-   Run below to install dependencies

    ```sh
    npm install
    ```

-   Set the correct username and access key as environment variables

    -   Linux/Unix/MacOS:

    ```sh
    export BROWSERSTACK_USERNAME=<username> &&
    export BROWSERSTACK_ACCESS_KEY=<access-key>
    ```

    -   Windows:

    ```bat
    set BROWSERSTACK_USERNAME=<username> &&
    set BROWSERSTACK_ACCESS_KEY=<access-key>
    ```

-   This repository contains a `bin/parallel.js` file which is inspired by [https://codecept.io/parallel/#custom-parallel-execution](https://codecept.io/parallel/#custom-parallel-execution) which is codeceptjs' official documentation to run tests in parallel. More information about the configuration can be found at the documentation. The highlight here:

    ```js
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
    ```

    This sets the capabilities and runs the tests on relevant browsers in parallel

<b>To run the tests:</b>

```sh
bin/parallel.js
```

## Configuring remote browser

The remote browser can be configured using the object inside the browsers array in the "paralle.js" file. You can find more on different configurations possible on [https://www.browserstack.com/docs/automate/playwright](https://www.browserstack.com/docs/automate/playwright) or contact [support@browserstack.com](mailto:support@browserstack.com)
