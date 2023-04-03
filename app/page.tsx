"use client";
import Link from "next/link";
import PinForm from "./pin/pinForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="max-h-screen m-auto bg-inherit flex flex-col">
      <div className=" w-fit rounded-b bg-rhino items-center flex flex-col h-auto text-center place-content-start">
        <Link
          className="pt-4 text-white font-mono text-base hover:underline"
          href="/code"
          prefetch={false}
        >
          {">"}Retrieve newest code from email{"<"}
        </Link>
        <PinForm />
        <Footer />
      </div>
    </div>
  );
}
