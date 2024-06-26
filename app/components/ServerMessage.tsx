import Image from "next/image"
import Spinner from "./Spinner"

export default function ServerMessage({ response, demoMode, waiting }: any) {
  const placeHolder: any = {
    src: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP838BQDwAGBQIApcDNuAAAAABJRU5ErkJggg==",
    alt: "Transparent placeholder image",
    link: "#",
  }
  const imagSrc = response.imageStr
    ? `data:image/png;base64,${JSON.parse(response.imageStr)}`
    : `data:image/png;base64,${placeHolder.src}`

  let handleClick = (e: any) => {
    e.preventDefault()
    if (response.imageStr) {
      const newTab = window.open()

      newTab?.document.write(
        `<!DOCTYPE html><head><title>Seemail full-size image</title></head><body><img width="auto" height="auto" src="${imagSrc}"></body></html>`
      )
    }
  }

  const visibility = response.status === 0 ? "hidden" : "visible"
  const serverMessageStyle = `${visibility} mt-6 relative grid h-56 w-96 grid-cols-1 content-around justify-items-center z-20`

  return (
    <div className={serverMessageStyle}>
      {waiting && <Spinner />}
      <span className="z-30 text-left text-lg font-medium italic text-base-content">
        <p>{response.body}</p>
        <p>{response.error}</p>
      </span>
      <div className="h-full w-full">
        {demoMode && (
          <a
            className="absolute inset-0 h-full w-full hover:cursor-default"
            href={imagSrc}
            target="_blank"
            rel="noreferrer"
          >
            <div className="h-full w-full">
              <Image
                src={imagSrc}
                alt={
                  response.imageStr
                    ? "Screenshot of last action on server"
                    : placeHolder.alt
                }
                className={`z-10 rounded-lg ${
                  response.imageStr
                    ? " blur-sm hover:cursor-pointer hover:blur-none"
                    : ""
                }`}
                onClick={handleClick}
                fill
              />
            </div>
            {response.imageStr ? (
              <p className="relative z-30 font-medium text-base-content">
                Click to open image in new tab
              </p>
            ) : null}
          </a>
        )}
      </div>
    </div>
  )
}
