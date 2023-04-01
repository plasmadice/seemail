import { VscGithubAlt } from "react-icons/vsc";

export default function Footer() {
  return (
    <div className="min-h-16 absolute bottom-0 w-screen bg-zinc-700 text-center grid grid-rows-1 grid-cols-2 py-2">
      <div className="m-auto">
        <a
          className="text-white font-mono text-base hover:underline"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/plasmadice/seemail"
        >
          {<VscGithubAlt className="m-auto" />}
          Link to GitHub repo
        </a>
      </div>
      <a
        className="text-2xl text-white font-medium hover:underline m-auto"
        target="_blank"
        rel="noreferrer"
        href="https://hwhite.dev/"
      >
        more by me ;)
      </a>
    </div>
  );
}
