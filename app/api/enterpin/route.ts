import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function GET(req: NextRequest, res: NextResponse) {
  const pageUrl = process.env.SITE_URL as string;
  const email = process.env.SITE_EMAIL as string;
  const passWord = process.env.SITE_PASSWORD as string;

  const searchParams = req.nextUrl.searchParams

  const pin: any = searchParams.get("pin");
  const screenshots: any = searchParams.get("screenshots");

  // Sanity check for required parameters
  if (!pin || pin.length < 6 || pin.length > 10 || Number.isNaN(Math.abs(pin.replaceAll("-", "").replaceAll(" ", "")))) {
    console.log("Pin failed validation");
    return NextResponse.json({ body: "Invalid entry", error: "PIN must be a 6-digit number" }, { status: 400 });
  }

  const screenshot = async (page: any) => {
    if (screenshots) {
      console.log("Taking screenshot for debugging. Expect header errors.");
      const file = await page.screenshot({
        type: "png",
        encoding: "base64",
      });
      return NextResponse.json({ body: "", imageStr: JSON.stringify(file) }, { status: 200 });
    }
  };

  const returnHTML = async (page: any) => {
    const html = await page.content();
    console.log("Returning HTML for debugging. Expect header errors.");
    // res.status(200).send(html);
    
  };

  const getCode = async () => {
    console.log("Getting activation code from API");
    const url = `${process.env.MAIN_URL}/api/getEmailContents`;
    const result = await fetch(url, { cache: "no-store" });
    const data = await result.json();
    console.log(`Activation code is ${data.code}`);
    return data.code;
  };

  try {
    console.log("Opening browser");
    const browser = await puppeteer.launch({
      args: process.env.NODE_ENV.includes("development") ? [] : chromium.args,
      defaultViewport: process.env.NODE_ENV.includes("development") ? undefined : chromium.defaultViewport,
      executablePath: process.env.NODE_ENV.includes("development") ? exePath : await chromium.executablePath(),
      headless: process.env.NODE_ENV.includes("development") ? false : chromium.headless,
    });
    console.log("Browser opened");

    const page = await browser.newPage();
    try {
      console.log("Navigating to page");
      await page.goto(pageUrl, { waitUntil: "networkidle0" });

      // Login
      await page.type(".form-control[name='email']", email);
      await page.type(".form-control[name='password']", passWord);
      await page.click(".btn-login");
      console.log("Login clicked");

      await page.waitForNetworkIdle({ idleTime: 2000 });

      // Waits for activation code page after login (common in cloud environment)
      const activationCodeBox = await page.$("input.form-control[placeholder='Activation code']");
      if (activationCodeBox) {
        console.log("Activation code box found");
        await page.type("input.form-control[placeholder='Activation code']", await getCode());
        await page.keyboard.press("Enter");
        await page.waitForNetworkIdle({ idleTime: 2000 });
      }

      try {
        await page.waitForSelector(".ng-scope > .profile:not(.disabled)  > .avatar > img[src='/assets/img/user_header_avatar.png']", { timeout: 60000 });
        await page.click(".ng-scope > .profile:not(.disabled)  > .avatar > img[src='/assets/img/user_header_avatar.png']");
      } catch (timeoutError) {
        console.log("Timeout waiting for profile avatar selector");
        throw new Error("Profile avatar selector timeout");
      }

      await page.waitForNetworkIdle({ idleTime: 2000 });

      // Waits for bank checkmark after login and handles it
      const reminderBox = await page.$(".conform-checkbox");
      if (reminderBox) await page.click(".conform-checkbox");
      const reminderButton = await page.$(".btn-success:not(.w-full)");
      if (reminderButton) await page.click(".btn-success:not(.w-full)");

      console.log("Navigate to pin login");
      // Navigate to pin login
      await page.goto(`${process.env.SITE_URL}/account/pin`);
      await page.waitForNetworkIdle({ idleTime: 1000 });

      // Enter pin
      await page.type("input.pin", pin);
      await page.click("button.btn-primary");

      await page.waitForNetworkIdle({ idleTime: 1000 });
      if (screenshots) await screenshot(page);
      const successResponse = await page.$("div.authorized-pin");

      // close the browser
      await browser.close();
      console.log("Browser closed");

      const error = successResponse ? undefined : "This is a bad thing.";
      const msg = successResponse ? `Device with PIN ${pin} is authorized` : "Authorization PIN not found";

      return NextResponse.json({ body: msg, error }, { status: 200 });
    } catch (e: any) {
      console.log(e);
      console.log("Failure AFTER browser creation");
      await browser.close();
      return NextResponse.json({ body: "Failure AFTER browser creation", error: e.message }, { status: 400 });
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ body: "Sorry, Something went wrong!", error: e.message }, { status: 400 });
  }
}