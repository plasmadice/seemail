"use client"
import Link from "next/link"
import PinForm from "../pin/pinForm"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="m-auto flex max-h-screen flex-col">
      <div className="p-8 bg-neutral flex h-auto w-fit flex-col place-content-start items-center rounded-lg text-center">
        <p className="text-neutral-content font-bold">
          Check Email:
          <Link
            className="link pt-4 text-neutral-content hover:underline"
            href="/code"
            prefetch={false}
          >
            Retrieve newest code
          </Link>
        </p>
        <PinForm />
        <Footer />
      </div>
    </div>
  )
}
