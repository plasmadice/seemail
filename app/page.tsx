"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-md max-h-max m-auto grid grid-cols-12 bg-inherit ">
      <div className="col-span-12 rounded-t bg-rhino p-32">
        <Link href="/code">Retrieve newest code from email</Link>
      </div>
      <div className="col-span-12 rounded-b bg-faded-blue p-32">
        <p>(unfinished)PIN LOGIN</p>
        <a target="_blank" href="https://github.com/plasmadice/seemail">
          Link to github repo
        </a>
      </div>
    </div>
  );
}
