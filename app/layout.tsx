import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-firefly grid h-screen place-items-center">
        {children}
      </body>
    </html>
  );
}
