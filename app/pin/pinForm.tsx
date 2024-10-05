"use client"
import { useState } from "react"
import ServerMessage from "./../components/ServerMessage"

export default function PinForm() {
  type apiResponse = {
    status: number
    body: string
    error: string | undefined
    imageStr: string | undefined
  }

  const [text, setText] = useState("")
  let emptyResponse: apiResponse = {
    status: 0,
    body: "",
    error: "",
    imageStr: "",
  }

  const [response, setResponse] = useState<apiResponse>(emptyResponse)

  const [waiting, setWaiting] = useState(false)
  const [demoMode, setDemoMode] = useState(false)

  async function sendPin(e: any) {
    setWaiting(true)
    e.preventDefault()

    emptyResponse.status = 202
    setResponse(emptyResponse)

    const url = `${process.env.ENTERPIN_URL}/?pin=${text.replace('-','')}&screenshots=${demoMode}`

    const res = await fetch(url, {
      cache: "no-store",
    })

    const status = res.status
    const data: apiResponse = await res.json()
    const body = data.body
    const error = data?.error
    const imageStr = data?.imageStr ? data.imageStr : undefined
    setResponse({ body, status, error, imageStr })
    await handleClearInput()
  }

  async function handleClearInput() {
    setText((prev: string) => (response.status ? "" : prev))
    setWaiting(false)
  }

  function handleInputChange(e: any) {
    setText(e.target.value)
  }

  async function handleScreenshotMode(e: any) {

    emptyResponse.status = 202
    setResponse(emptyResponse)
    setDemoMode((prev: boolean) => {
      if (prev) {
        emptyResponse.status = 0
        setResponse(emptyResponse)
      }

      !prev
        ? setText((oldText: string) => (oldText.length ? oldText : "123456"))
        : setText((oldText: string) => (oldText.length ? oldText : ""))
      return !prev
    })
  }

  return (
    <form
      onSubmit={sendPin}
      noValidate
      className="grid h-full w-full grid-cols-1 place-items-center"
    >
      <div className="mt-4 row-span-3 grid grid-cols-1 space-y-4">
        <p className="pt-4 text-base font-bold text-neutral-content">Pin Login:</p>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Ex 123456. Takes ~30-90 seconds"
          className="w-72 input focus:outline text-base-content"
        />
        <div className="m-auto w-full content-center gap-4 px-4">
          <button
            onClick={sendPin}
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-full bg-secondary hover:bg-secondary-focus text-secondary-content py-1 text-sm font-medium uppercase transition-all content-center"
            type="button"
          >
            Enter Pin
          </button>
        </div>
      </div>
      <label
        htmlFor="screenshotMode"
        className="w-full py-4 grid grid-cols-6 text-neutral-content hover:cursor-pointer"
      >
        <span className="col-start-2 col-span-3">Demo Mode?</span>
        <input
          onChange={handleScreenshotMode}
          className="h-6 w-6 hover:cursor-pointer checkbox checkbox-secondary bg-secondary-focus"
          id="screenshotMode"
          type="checkbox"
          defaultChecked={false}
        />
      </label>
      <div className="h-full w-full">
        <ServerMessage
          response={response}
          demoMode={demoMode}
          waiting={waiting}
        />
      </div>
    </form>
  )
}
