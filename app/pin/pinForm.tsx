"use client";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";
import ServerMessage from "../../components/ServerMessage";

export default function PinForm() {
  type apiResponse = {
    status: number;
    body: string;
    error: string | undefined;
    imageStr: string | undefined;
  };

  const [text, setText] = useState("");
  const [response, setResponse] = useState<apiResponse>({
    status: 0,
    body: "",
    error: "",
    imageStr: "",
  });
  const [waiting, setWaiting] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  async function sendPin(e: any) {
    setWaiting(true);
    e.preventDefault();

    const url = `${process.env.ENTERPIN_URL}/?pin=${text}&screenshots=${demoMode}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: { cors: "no-cors" },
    });

    const status = res.status;
    const data: apiResponse = await res.json();
    const body = data.body;
    const error = data?.error;
    const imageStr = data?.imageStr ? data.imageStr : undefined;
    setResponse({ body, status, error, imageStr });
    await handleClearInput();
  }

  async function handleClearInput() {
    setText((prev) => (response.status ? "" : prev));
    setWaiting(false);
  }

  function handleInputChange(e: any) {
    setText(e.target.value);
  }

  async function handleScreenshotMode() {
    setDemoMode((prev) => {
      !prev
        ? setText((oldText) => (oldText.length ? oldText : "123456"))
        : setText((oldText) => (oldText.length ? oldText : ""));
      return !prev;
    });
  }

  return (
    <form
      onSubmit={sendPin}
      noValidate
      className="p-4 h-full grid grid-cols-1 grid-rows-12"
    >
      <div className="space-y-4 grid grid-cols-1 row-span-3 px-6">
        <p className="text-white font-mono text-base pt-4">PIN LOGIN</p>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder='"123456" - usually takes 30-50 seconds'
          className="w-full appearance-none bg-blue-haze border-none text-gray-700 py-1 px-2 leading-tight focus:outline rounded-sm"
        />
        <div className="w-full m-auto content-center gap-4 px-4">
          <button
            onClick={sendPin}
            className="bg-blue-600 hover:scale-105 hover:bg-blue-800 transition-all text-sm text-white py-1 rounded-sm w-full uppercase font-medium"
            type="button"
          >
            Enter Pin
          </button>
        </div>
      </div>
      <div className="w-80 h-60 md:w-96 md:h-72 py-4">
        <ServerMessage
          response={response}
          demoMode={demoMode}
          waiting={waiting}
        />
      </div>
      <a
        id="tooltip-text"
        className="grid grid-cols-4 place-content-center py-4"
      >
        <label
          onClick={handleScreenshotMode}
          htmlFor="screenshotMode"
          className="col-span-3 text-white"
        >
          Screenshot when done?
        </label>
        <input
          onChange={handleScreenshotMode}
          className="h-6 w-6"
          name="screenshotMode"
          type="checkbox"
          checked={demoMode}
        />
      </a>
      {/* <Tooltip
        anchorSelect="#tooltip-text"
        content="Experimental: Sends a screenshot of the LAST thing done on the server. Clicking this adds a default pin to the input."
        className="break-words w-72"
      /> */}
    </form>
  );
}
