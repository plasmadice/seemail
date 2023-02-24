"use client";
import { useState } from "react";

export default function PinForm() {
  type apiResponse = {
    status: number;
    body: string;
    error: string | undefined;
  };

  const [text, setText] = useState("");
  const [response, setResponse] = useState<apiResponse>({
    status: 0,
    body: "",
    error: "",
  });
  const [waiting, setWaiting] = useState(false);

  async function sendPin(e: any) {
    e.preventDefault();

    // Strip extra characters from input
    text.includes("-") ? setText(text.replaceAll("-", "")) : null;
    text.includes(" ") ? setText(text.replaceAll(" ", "")) : null;

    // Pull url based on environment
    const url = `${process.env.NEXT_PUBLIC_URL}/api/enterpin?pin=${text}${
      process.env.NODE_ENV.includes("development") ? "&isDev=true" : ""
    }`;

    const res = await fetch(url, { cache: "no-store" });
    const data: apiResponse = await res.json();
    const body = data.body;
    const status = res.status;
    const error = data?.error;
    setResponse({ body, status, error });
    return data;
  }

  function handleInputChange(e: any) {
    setText(e.target.value);
  }
  return (
    <form onSubmit={sendPin} noValidate>
      <div className="flex items-center border-b border-rhino py-2">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder='"123456"'
          className="appearance-none bg-blue-haze border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline"
        />

        <div>
          <button
            onClick={sendPin}
            className="flex-shrink-0 bg-windows-blue hover:bg-firefly text-sm text-white py-1 px-2 rounded"
            type="button"
          >
            Submit
          </button>
          <button
            onClick={() => setText("")}
            className="flex-shrink-0 bg-persian-red hover:bg-firefly text-sm text-white py-1 px-2 rounded"
            type="button"
          >
            Clear
          </button>
        </div>
        {response.body.length && (
          <span className="text-red-300 text-xs italic">{response.body}</span>
        )}
        {response.error && response.error.length && (
          <span className="error text-red-900 text-xs italic">
            {response.error}
          </span>
        )}
      </div>
    </form>
  );
}
