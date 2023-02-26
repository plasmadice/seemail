import "./globals.css";

export const metadata = {
  generator: "Next.js",
  applicationName: "seemail",
  keywords: ["seemail", "nextjs", "puppeteer"],
  authors: [{ name: "Josh", url: "https://hwhite.dev/" }],
  themeColor: "slate",
  colorScheme: "dark",
  title: "Seemail",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-firefly h-screen flex items-center place-items-center overflow-hidden">
        {children}
      </body>
    </html>
  );
}
