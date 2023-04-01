import Image from "next/image";
import Spinner from "./Spinner";

export default function ServerMessage({ response, demoMode, waiting }: any) {
  const placeHolder: any = {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
    demo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP838BQDwAGBQIApcDNuAAAAABJRU5ErkJggg==",
    alt: "Transparent placeholder image",
  };

  console.log(response.body);

  return (
    <div
      className={`w-full h-full grid grid-cols-1 place-content-around relative ${
        demoMode ? "shadow-blue-700 shadow-sharp" : ""
      }`}
    >
      {waiting && <Spinner />}
      <span className="text-black text-lg font-medium italic z-10">
        <p>{response.body}</p>
      </span>
      <span className="text-rose-900 font-bold text-xs italic place-content-center z-10">
        {response.error}
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
          className="hover:scale-150 hover:z-20 transition-all"
          fill
        />
      )}
    </div>
  );
}
