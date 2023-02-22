"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto grid max-w-lg grid-cols-12 bg-inherit max-h-max m-auto">
      <div className="col-span-12 rounded-t bg-gray-600 p-32">
        <Link href="/code">Retrieve code from email</Link>
      </div>
      <div className="col-span-12 rounded-b border border-gray-500 bg-gray-200 p-32">
        <p>(unfinished)PIN LOGIN</p>
        <a target="_blank" href="https://github.com/plasmadice/seemail">
          Link to github repo
        </a>
      </div>
    </div>
  );
}
