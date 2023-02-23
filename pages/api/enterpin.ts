// Shout outs to the following repositories:

// https://github.com/vercel/og-image
// https://github.com/ireade/netlify-puppeteer-screenshot-demo
// https://github.com/whitep4nth3r/puppeteer-demo

import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function getOptions(isDev: boolean) {
  let options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
  return options;
}

module.exports = async (req: any, res: any) => {
  const pageUrl: any = process.env.SITE_URL;
  const email: any = process.env.SITE_EMAIL;
  const passWord: any = process.env.SITE_PASSWORD;

  const isDev: boolean = req?.query?.isDev === "true";
  const pin: any = req?.query?.pin;

  try {
    // pin length sanity check
    if (pin.length < 6) {
      res.statusCode = 400;
      res.json({
        body: "Pin must be 6 or more characters",
      });
    }

    // get options for browser
    const options = await getOptions(isDev);

    // launch a new headless browser with dev / prod options
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    // set the viewport size
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // tell the page to visit the url
    await page.goto(pageUrl);

    // Login
    await page.type(".form-control[name='email']", email);
    await page.type(".form-control[name='password']", passWord);
    await page.click('.btn-login');
    await page.waitForNetworkIdle({idleTime: 2000});

    await page.click('.ng-scope > .profile:not(.disabled)  > .avatar > img[src="/assets/img/user_header_avatar.png"]');
    await page.waitForNetworkIdle({idleTime: 2000});

    // Waits for bank checkmark after login and handles it
    const reminderBox = await page.$('.conform-checkbox');
    reminderBox ?  await page.click('.conform-checkbox') : null;
    const reminderButton = await page.$('.btn-success:not(.w-full)')
    reminderButton ?  await page.click('.btn-success:not(.w-full)') : null;

    // Navigate to pin login
    await page.goto(`${process.env.SITE_URL}/account/pin`)
    await page.waitForNetworkIdle({idleTime: 1000});

    // Enter pin
    await page.type('input.pin', pin);
    await page.click('button.btn-primary')

    // take a screenshot
    const file = await page.screenshot({
      type: "png",
    });

    // close the browser
    await browser.close();

    // return the file!
    res.status(200).json({body: "Success!"})
  } catch (e: any) {
    res.status(500).json({
      body: "Sorry, Something went wrong!",
      error: e.message
    })
  }
};