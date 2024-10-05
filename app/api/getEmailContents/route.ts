import { NextResponse } from "next/server"

export async function GET(request: Request) {
  let status, data = {}

  const main = async () => {
    try {
      // Fetch data from the getCode API
      const url = process.env.GET_CODE_FROM_EMAIL_URL as string;
      const result = await fetch(url, { cache: "no-store" });
      const { code, date } = await result.json();

      // Check for errors in the external API response
      if (result.ok) {
        status = 200;
        data = { code, date };
      } else {
        status = result.status;
        data = { error: "Failed to fetch code from the external API" };
      }
    } catch (e: any) {
      console.log(e);
      status = 500;
      data = { error: e.message };
    }
  };

  await main();
  return NextResponse.json(data, { status });
}
