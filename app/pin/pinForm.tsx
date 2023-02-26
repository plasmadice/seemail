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
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    });

    return (
      <div className="flex items-center justify-center flex-col">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-warning"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>

        <p className="text-goldenrod">{timeLeft}</p>
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
    return data;
  }

  function handleClearInput() {
    setText("");
    setWaiting(false);
  }

  function handleInputChange(e: any) {
    setText(e.target.value);
  }

  useEffect(() => {
    handleClearInput();
  }, [response]);

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
          <span className="text-goldenrod text-sm italic">{response.body}</span>
          <span className="error font-bold text-red-900 text-xs italic">
            {response.error}
          </span>
        </div>
      </div>
    </form>
  );
}
