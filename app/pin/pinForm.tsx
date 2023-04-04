'use client'
import { useState } from 'react'
import ServerMessage from './../components/ServerMessage'

export default function PinForm() {
  type apiResponse = {
    status: number
    body: string
    error: string | undefined
    imageStr: string | undefined
  }

  const [text, setText] = useState('')
  let emptyResponse: apiResponse = {
    status: 0,
    body: '',
    error: '',
    imageStr: '',
  }

  const [response, setResponse] = useState<apiResponse>(emptyResponse)

  const [waiting, setWaiting] = useState(false)
  const [demoMode, setDemoMode] = useState(false)

  async function sendPin(e: any) {
    setWaiting(true)
    e.preventDefault()
    setResponse(emptyResponse)

    const url = `${process.env.ENTERPIN_URL}/?pin=${text}&screenshots=${demoMode}`

    const res = await fetch(url, {
      cache: 'no-store',
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
    setText((prev: string) => (response.status ? '' : prev))
    setWaiting(false)
  }

  function handleInputChange(e: any) {
    setText(e.target.value)
  }

  async function handleScreenshotMode(e: any) {
    setDemoMode((prev: boolean) => {
      !prev
        ? setText((oldText: string) => (oldText.length ? oldText : '123456'))
        : setText((oldText: string) => (oldText.length ? oldText : ''))
      return !prev
    })
  }

  return (
    <form
      onSubmit={sendPin}
      noValidate
      className='grid-rows-12 grid h-full w-full grid-cols-1 place-items-center'
    >
      <div className='row-span-3 grid grid-cols-1 space-y-4 px-6'>
        <p className='p-4 font-mono text-base text-white'>PIN LOGIN</p>
        <input
          type='text'
          value={text}
          onChange={handleInputChange}
          placeholder='Ex 123456. Takes ~30-60 seconds'
          className='w-72 appearance-none rounded-sm border-none bg-blue-haze py-1 px-2 leading-tight text-gray-700 focus:outline'
        />
        <div className='m-auto w-full content-center gap-4 px-4'>
          <button
            onClick={sendPin}
            className='w-full rounded-sm bg-blue-600 py-1 text-sm font-medium uppercase text-white transition-all hover:bg-blue-800'
            type='button'
          >
            Enter Pin
          </button>
        </div>
      </div>
      <div className='h-full w-full py-4'>
        <ServerMessage
          response={response}
          demoMode={demoMode}
          waiting={waiting}
        />
      </div>
      <label
        htmlFor='screenshotMode'
        className='w-full py-4 grid grid-cols-6 text-white hover:cursor-pointer'
      >
        <span className='col-start-2 col-span-3'>Screenshot when done?</span>
        <input
          onChange={handleScreenshotMode}
          className='h-6 w-6 hover:cursor-pointer'
          id='screenshotMode'
          type='checkbox'
          // checked={demoMode}
          defaultChecked={false}
        />
      </label>
    </form>
  )
}
