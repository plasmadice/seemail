import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core"
import type { NextApiRequest, NextApiResponse } from 'next'

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
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
  return options;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const main = async () => {
    console.log(`Node version: ${process.version}`)
    const pageUrl: any = process.env.SITE_URL;
    const email: any = process.env.SITE_EMAIL;
    const passWord: any = process.env.SITE_PASSWORD;
  
    const isDev: boolean = req?.query?.isDev === "true";
    const pin: any = req?.query?.pin;

    const debugLog = (m: any) => {
      // if (isDev) {
        console.log(m)
      // }
    }

    const screenshot = async (page: puppeteer.Page) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", `image/png`);
      const file = await page.screenshot({
        type: "png",
      });
      res.send(file)
    }

    try { /* to open the browser */
      // pin length sanity check
      if (pin.length < 6) {
        debugLog("Pin length too short");
        res.status(400).json({body: "Pin must be 6 or more numbers ('-' and spaces will be removed)"})
      } else {
        // get options for browser
        const options = await getOptions(isDev);
    
        // launch a new headless browser with dev / prod options
        const browser: puppeteer.Browser = await puppeteer.launch(options);
        debugLog("After browser creation");
        const page: puppeteer.Page = await browser.newPage();
        // set the viewport size
        await page.setViewport({
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
        });

        try { /* to navigate and login */
          // tell the page to visit the url
          await page.goto(pageUrl, { waitUntil: "domcontentloaded"});
          debugLog("After page navigation");
      
          // Login
          await page.type(".form-control[name='email']", email);
          await page.type(".form-control[name='password']", passWord);
          await page.click('.btn-login');

          await page.waitForFunction("document.querySelector('#site-preloader') && document.querySelector('#site-preloader').style.display === 'none'");

          const user = await page.waitForSelector('.ng-scope > .profile:not(.disabled)  > .avatar > img[src="/assets/img/user_header_avatar.png"]', {timeout: 2000})
          user ? user.click() : null;
          debugLog("After login");
          screenshot(page)
      
          // Waits for bank checkmark after login and handles it
          const reminderBox = await page.$('.conform-checkbox');
          reminderBox ?  await page.click('.conform-checkbox') : null;
          const reminderButton = await page.$('.btn-success:not(.w-full)')
          reminderButton ?  await page.click('.btn-success:not(.w-full)') : null;
          debugLog("After checking for reminders");
      
          // Navigate to pin login
          await page.goto(`${process.env.SITE_URL}/account/pin`, { waitUntil: "networkidle0"})
          debugLog("After navigate to pin login page");
      
          // Enter pin
          await page.type('input.pin', pin);
          await page.click('button.btn-primary')
          debugLog("After pin login");
      
          // close the browser
          await browser.close();
      
          res.status(200).json({body: "Successful login"})
        } catch (e: any) {
          res.status(400).json({
            body: "Failure AFTER browser creation",
            error: e.message
          })
          debugLog("Failure AFTER browser creation")
        }
      }
    } catch (e: any) {
      debugLog(e)
      res.status(400).json({
        body: "Sorry, Something went wrong!",
        error: e.message
      })
    }
  };
  
  // main() 
  return main().catch(err => err);
}
