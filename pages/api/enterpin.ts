import type { NextApiRequest, NextApiResponse } from 'next'
import chromium from "@sparticuz/chromium-min"
import puppeteer from "puppeteer-core"

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";


export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const main = async () => {

    const pageUrl: any = process.env.SITE_URL;
    const email: any = process.env.SITE_EMAIL;
    const passWord: any = process.env.SITE_PASSWORD;
  
    const pin: any = req?.query?.pin;
    
    console.log(`Env: ${process.env.NODE_ENV} | url: ${pageUrl}`)

    const screenshot = async (page: any) => {

      console.log("Taking screenshot for debugging. Expect header errors.");
      res.statusCode = 200;
      res.setHeader("Content-Type", `image/png`);
      const file = await page.screenshot({
        type: "png",
      });

      res.send(file)
    }

    const returnHTML = async (page: any) => {
      
      const html = await page.content();
      console.log(html);

      console.log("Returning HTML for debugging. Expect header errors.");
      res.statusCode = 200;
      res.send(html)
    }

    const getCode = async () => {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/getEmailContents`;
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      const code = data.code;
      console.log(`Code: ${code}`)
      return code;
    }

    try { /* to open the browser */

      // pin length sanity check
      if (!pin || pin.length < 6 || pin.length > 10 || Number.isNaN(Math.abs(pin))) {
        console.log("Pin failed validation");

        res.status(400).json({body: "Hint: Pin must be 6-10 numbers long ('-' and spaces will be ignored)"})

      } else {
    
        // launch a new headless browser with dev / prod options
        const browser = await puppeteer.launch({
          args: process.env.NODE_ENV.includes('development') ? [] : chromium.args,
          defaultViewport: process.env.NODE_ENV.includes('development') ? undefined : chromium.defaultViewport,
          executablePath: process.env.NODE_ENV.includes('development') ? exePath : await chromium.executablePath(
            "https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar"
          ),
          headless: process.env.NODE_ENV.includes('development') ? true : chromium.headless,
          ignoreHTTPSErrors: process.env.NODE_ENV.includes('development') ? undefined : true,
        });
        
        const page = await browser.newPage();

        try { /* to navigate and login */
        
          await page.goto(pageUrl, { waitUntil: "networkidle0" });
    
          // Login
          await page.type(".form-control[name='email']", email);
          await page.type(".form-control[name='password']", passWord);
          await page.click('.btn-login');

          await page.waitForNetworkIdle({idleTime: 2000});

          // failing at this point, likely due to code being required from email
          if (pin === "543210") {
            // await returnHTML(page)
          }

          // Check for activation code requirement input.form-control[placeholder="Activation code"]
          // Waits for activation code page after login
          const activationCodeBox = await page.$('input.form-control[placeholder="Activation code"]');

          if (activationCodeBox) {
            await page.type('input.form-control[placeholder="Activation code"]', await getCode());
            await page.keyboard.press('Enter');
            await page.waitForNetworkIdle({idleTime: 2000});
          }
          
          await page.waitForSelector('.ng-scope > .profile:not(.disabled)  > .avatar > img[src="/assets/img/user_header_avatar.png"]'),
          await page.click('.ng-scope > .profile:not(.disabled)  > .avatar > img[src="/assets/img/user_header_avatar.png"]')
          
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
      
          // close the browser
          await browser.close();
      
          res.status(200).json({body: "Successful login"})
        } catch (e: any) {
          res.status(400).json({
            body: "Failure AFTER browser creation",
            error: e.message
          })
          console.log("Failure AFTER browser creation")
        }
      }
    } catch (e: any) {
      console.log(e)
      res.status(400).json({
        body: "Sorry, Something went wrong!",
        error: e.message
      })
    }
  };
  
  // main() 
  return main().catch(console.log);
}
