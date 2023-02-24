"use client";
import Link from "next/link";
import PinForm from "./pin/pinForm";

export default function Home() {
  return (
    <div className="h-max m-auto bg-inherit max-w-md flex flex-col min-h-fit">
      <div className="rounded-t bg-rhino p-12 text-center">
        <Link className=" text-white font-mono text-base" href="/code">
          {">"}Retrieve newest code from email{"<"}
        </Link>
      </div>
      <div className="rounded-b bg-faded-blue max-w-md p-12 items-center flex flex-col h-max text-center">
        <PinForm />
        <a
          className="text-white font-mono text-base"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/plasmadice/seemail"
        >
          Link to github repo
        </a>
      </div>
    </div>
  );
}
