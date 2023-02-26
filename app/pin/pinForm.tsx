"use client";
import { useState, useEffect } from "react";

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

  const Spinner = () => {
    let timer: any;
    const [count, setCount] = useState(60);

    const updateCount = () => {
      timer =
        !timer &&
        setInterval(() => {
          setCount((prevCount) => prevCount - 1);
        }, 1000);
      if (count <= 0) clearInterval(timer);
    };

    useEffect(() => {
      updateCount();
    }, []);

    useEffect(() => {
      return () => (count <= 0 ? clearInterval(timer) : undefined);
    }, [count]);

    return (
      <div className="flex justify-center items-center">
        <div
          className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-warning relative z-0"
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

    // Strip extra characters from input
    const sanitizedText = text.replaceAll("-", "").replaceAll(" ", "");

    // Pull url based on environment
    const url = `${process.env.NEXT_PUBLIC_URL}/api/enterpin?pin=${sanitizedText}`;

    const res = await fetch(url, { cache: "no-store" });
    const data: apiResponse = await res.json();
    const body = data.body;
    const status = res.status;
    const error = data?.error;
    setResponse({ body, status, error });
    handleClearInput();
    return data;
  }

  function handleClearInput() {
    console.log("Input cleared");
    setText("");
    setWaiting(false);
  }

  function handleInputChange(e: any) {
    setText(e.target.value);
  }

  return (
    <form onSubmit={sendPin} noValidate className="w-11/12 h-max min-h-fit">
      <p className="text-white font-mono text-base pb-4">
        (unfinished)PIN LOGIN
      </p>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder='"123456"'
          className="appearance-none bg-blue-haze border-none text-gray-700 py-1 px-2 leading-tight focus:outline w-[90%]"
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
            disabled={waiting}
            onClick={handleClearInput}
            className="flex-shrink-0 bg-persian-red hover:bg-firefly text-sm text-white py-1 px-2 rounded"
            type="button"
          >
            Clear
          </button>
        </div>
        <div className="h-full flex flex-col space-y-1 max-w-xs">
          {waiting && <Spinner />}
          <span className="text-rose-700 text-sm italic">
            {waiting ? "Usually takes 30-50 seconds" : response.body}
          </span>
          <span className="error font-bold text-red-900 text-xs italic">
            {response.error}
          </span>
        </div>
      </div>
    </form>
  );
}
