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
    <form onSubmit={sendPin} noValidate className="w-fit h-max min-h-fit">
      <p className="text-white font-mono text-base">(unfinished)PIN LOGIN</p>
      <div className="flex flex-col items-center border-b border-rhino space-y-4">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder='"123456"'
          className="appearance-none bg-blue-haze border-none text-gray-700 py-1 px-2 leading-tight focus:outline w-full"
        />

        <div className="flex items-center space-x-8">
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
        <div className="h-fit flex flex-col space-y-1">
          <span className="text-goldenrod text-sm italic">{response.body}</span>
          <span className="error font-bold text-red-900 text-xs italic">
            {response.error}
          </span>
        </div>
      </div>
    </form>
  );
}
