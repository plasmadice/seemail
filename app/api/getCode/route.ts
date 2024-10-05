import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Construct the URL for the external API request
    const url = process.env.GET_CODE_FROM_EMAIL_URL as string;
    
    // Fetch the data from the external URL
    const result = await fetch(url, { cache: "no-store" });
    const data = await result.json();

    // Extract code and date from the API response
    const { code, date } = data;

    // Return the code and date using NextResponse
    return NextResponse.json({ code, date }, { status: result.status });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching code and date:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the code and date" },
      { status: 500 }
    );
  }
}
