"use client";
import Link from "next/link";
import PinForm from "./pin/pinForm";

export default function Home() {
  return (
    <div className="max-w-md max-h-max m-auto grid grid-cols-12 bg-inherit ">
      <div className="col-span-12 rounded-t bg-rhino p-32">
        <Link className="text-white font-mono text-base" href="/code">
          Retrieve newest code from email
        </Link>
      </div>
      <div className="col-span-12 rounded-b bg-faded-blue p-32 flex-auto max-h-max max-w-max">
        <p className="text-white font-mono text-base">(unfinished)PIN LOGIN</p>
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
