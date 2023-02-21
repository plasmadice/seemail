"use client";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-12 gap-4 bg-zinc-50 p-1 h-screen">
      <div className="col-span-12 rounded-lg border border-zinc-300 bg-gray-600 p-32">
        {/* <ThemeToggle /> */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          toggle
        </button>
        <br />
        <Link href="/code">Retrieve code from email</Link>
      </div>
      <div className="col-span-12 rounded-lg border border-gray-500 bg-gray-200 p-32">
        <p>(unfinished)PIN LOGIN</p>
        <a target="_blank" href="https://github.com/plasmadice/seemail">
          Link to github repo
        </a>
      </div>
    </div>
  );
}
