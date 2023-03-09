"use client";
import Link from "next/link";
import PinForm from "./pin/pinForm";

export default function Home() {
  return (
    <div className="max-h-screen m-auto bg-inherit max-w-md flex flex-col">
      <div className="rounded-t bg-zinc-700 min-w-md text-center flex flex-col space-y-4 h-80 w-96 place-content-center">
        <Link className=" text-white font-mono text-base" href="/code">
          {">"}Retrieve newest code from email{"<"}
        </Link>
        <a
          className="text-white font-mono text-base"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/plasmadice/seemail"
        >
          Link to GitHub repo
        </a>
      </div>
      <div className="rounded-b bg-rhino max-w-md min-w-md items-center flex flex-col h-80 w-96 text-center place-content-start">
        <PinForm />
      </div>
    </div>
  );
}
