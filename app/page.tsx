"use client";
import Link from "next/link";
// import { useTheme } from "next-themes";

// const ThemeToggle = () => {
//   const { theme, setTheme } = useTheme();

//   return (
//     <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
//       toggle me
//     </button>
//   );
// };

export default function Home() {
  // const { theme, setTheme } = useTheme();

  return (
    // <Grid.Container
    //   style={{ height: "auto" }}
    //   gap={2}
    //   justify="center"
    //   direction="column"
    //   alignContent="center"
    // >
    //   <Grid xs={12} style={{ height: "auto", maxWidth: "500px" }}>
    //     <MockItem>
    //
    //     </MockItem>
    //   </Grid>
    //   <Grid xs={12} style={{ height: "auto", maxWidth: "500px" }}>
    //     <MockItem>
    //
    //     </MockItem>
    //   </Grid>
    // </Grid.Container>
    <div className="mx-auto grid max-w-4xl grid-cols-12 gap-4 bg-zinc-50 p-1 h-screen">
      <div className="col-span-12 rounded-lg border border-zinc-300 bg-gray-600 p-32">
        {/* <ThemeToggle /> */}
        {/* <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          toggle me
        </button> */}
        <h1>Some content</h1>
        <h4>More content </h4>
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
