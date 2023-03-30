"use client";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

export default function PinForm() {
  type apiResponse = {
    status: number;
    body: string;
    error: string | undefined;
    // imageStr: string | undefined;
  };

  const [text, setText] = useState("");
  const [response, setResponse] = useState<apiResponse>({
    status: 0,
    body: "",
    error: "",
    // imageStr: ""
  });
  const [waiting, setWaiting] = useState(false);
  const [screenshotChecked, setScreenshotChecked] = useState(false);

  const Spinner = () => {
    const [count, setCount] = useState(60);

    useEffect(() => {
      const countId = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countId);
    }, []);

    return (
      <div className="flex justify-center items-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-warning relative z-0"
          role="status"
        />

        <p className="text-goldenrod h-8 w-8 absolute flex justify-center items-center">
          {count > 0 ? count : 0}
        </p>
      </div>
    );
  };

  async function sendPin(e: any) {
    setWaiting(true);
    e.preventDefault();

    // Pull url based on environment
    const url = `${process.env.NEXT_PUBLIC_URL}/api/enterpin?pin=${text}`;

    const res = await fetch(url, { cache: "no-store" });
    const status = res.status;
    console.log(`res.status: ${res.status}`);
    const data: apiResponse = await res.json();
    const body = data.body;
    // const imageStr = data.body.imageStr
    console.log(`typeof data.body: ${typeof data.body}`);
    console.log(`body: ${body}`);
    console.log(`typeof data.body: ${typeof data.body}`);
    const error = data?.error;
    // if (console.log())
    setResponse({ body, status, error });
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
    setScreenshotChecked((prev) => {
      !prev ? setText("123456") : setText("");
      return !prev;
    });
  }

  return (
    <form
      onSubmit={sendPin}
      noValidate
      className="w-[90%] h-full grid grid-cols-1 grid-rows-6"
    >
      <div className="h-[70%][ space-y-4] grid grid-cols-1 row-span-3">
        <p className="text-white font-mono text-base pt-4">PIN LOGIN</p>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder='"123456"'
          className="w-full max-h-10 appearance-none bg-blue-haze border-none text-gray-700 py-1 px-2 leading-tight focus:outline"
        />
        <div className="w-full grid grid-cols-6 m-auto content-center gap-4 px-2">
          <button
            onClick={sendPin}
            className="flex-shrink-0 bg-blue-800 hover:bg-firefly text-sm text-white py-1 px-2 rounded col-span-3 row-span-1"
            type="button"
          >
            Submit
          </button>
          <button
            disabled={waiting}
            onClick={handleClearInput}
            className="flex-shrink-0 bg-persian-red hover:bg-firefly text-sm text-white py-1 px-2 rounded col-span-3"
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
      <div
        data-tooltip-id="tooltip-text"
        data-tooltip-content="CURRENTLY DISABLED: Enables screenshot mode: Sends screenshots of progress from the server"
        className="w-full grid grid-cols-12 row-span-1 place-content-center"
      >
        <label
          onClick={handleScreenshotMode}
          htmlFor="screenshotMode"
          className="col-span-4 text-white"
        >
          Demo Mode
        </label>
        <input
          onChange={handleScreenshotMode}
          className="col-span-1 h-6 w-6 place-self-end"
          name="screenshotMode"
          type="checkbox"
          checked={screenshotChecked}
        />
      </div>
      <div className="w-full grid grid-cols-1 row-span-2 space-y-1 place-content-around">
        <Tooltip id="tooltip-text" className="text-white h-0" />
        <span className="text-goldenrod text-lg font-medium italic">
          {waiting ? "Usually takes 30-50 seconds" : response.body}
        </span>
        <span className="font-bold text-red-900 text-xs italic place-content-center">
          {response.error}
        </span>
        {waiting && <Spinner />}
      </div>
    </form>
  );
}
