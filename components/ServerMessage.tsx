import { useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

export default function ServerMessage({ response, demoMode, waiting }: any) {
  const placeHolder: any = {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
    demo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP838BQDwAGBQIApcDNuAAAAABJRU5ErkJggg==",
    alt: "Transparent placeholder image",
  };

  const [imageIsLarge, setImageIsLarge] = useState(false);

  let handleClick = () => {
    setImageIsLarge((prev) => !prev);
  };

  return (
    <div
      className={`${
        imageIsLarge
          ? "transition-all ease-out duration-700 w-[64rem] h-[36rem] absolute m-auto inset-0"
          : "w-full h-full relative"
      }  grid grid-cols-1 place-content-around ${
        demoMode ? "shadow-blue-700 shadow-sharp" : ""
      }`}
    >
      {waiting && <Spinner />}
      <span className="text-white text-lg font-medium italic z-30 text-left">
        <p>{response.body}</p>
        <p>{response.error}</p>
      </span>
      {demoMode && (
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
          className="hover:z-20 hover:cursor-pointer"
          onClick={handleClick}
          fill
        />
      )}
    </div>
  );
}
