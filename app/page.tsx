"use client";
import Link from "next/link";
import PinForm from "./pin/pinForm";

export default function Home() {
  return (
    <div className="h-max m-auto bg-inherit max-w-md flex flex-col min-h-fit">
      <div className="rounded-t bg-rhino min-w-md text-center flex flex-col space-y-4 h-80 w-96 place-content-center">
        <Link className=" text-white font-mono text-base" href="/code">
          {">"}Retrieve newest code from email{"<"}
        </Link>
        <a
          className="text-white font-mono text-base"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/plasmadice/seemail"
        >
          Link to github repo
        </a>
      </div>
      <div className="rounded-b bg-faded-blue max-w-md min-w-md items-center flex flex-col h-80 w-96 text-center place-content-center">
        <PinForm />
      </div>
    </div>
  );
}
