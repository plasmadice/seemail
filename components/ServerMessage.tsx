// import { useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

export default function ServerMessage({ response, demoMode, waiting }: any) {
  const placeHolder: any = {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
    demo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP838BQDwAGBQIApcDNuAAAAABJRU5ErkJggg==",
    alt: "Transparent placeholder image",
    link: "#",
  };

  // const [imageIsLarge, setImageIsLarge] = useState(false);

  // let handleClick = () => {
  //   setImageIsLarge((prev) => !prev);
  // };
  let handleClick = (e: any) => {
    // if (!response.imageStr) {
    //   e.preventDefault();
    // }
    const newTab = window.open();

    newTab?.document.write(
      `<!DOCTYPE html><head><title>Document preview</title></head><body><img src="data:image/png;base64,${JSON.parse(
        response.imageStr
      )}"></body></html>`
    );
  };

  return (
    <div className="w-96 h-56 relative grid grid-cols-1 content-around justify-items-center">
      {waiting && <Spinner />}
      <span className="text-white text-lg font-medium italic z-30 text-left">
        <p>{response.body}</p>
        <p>{response.error}</p>
      </span>
      <div className="w-full h-full">
        {demoMode && (
          <a
            href={
              response.imageStr
                ? `data:image/png;base64,${JSON.parse(response.imageStr)}`
                : placeHolder.link
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={
                response.imageStr
                  ? `data:image/png;base64,${JSON.parse(response.imageStr)}`
                  : placeHolder.demo
              }
              alt={
                response.imageStr
                  ? "Screenshot of last action on server"
                  : placeHolder.alt
              }
              className="blur-sm hover:blur-none px-4 z-10 hover:cursor-pointer"
              onClick={handleClick}
              fill
            />
            {response.imageStr ? (
              <p className="text-white font-medium z-30 relative">
                Click to open image in new tab
              </p>
            ) : null}
          </a>
        )}
      </div>
    </div>
  );
}
