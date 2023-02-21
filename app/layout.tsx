import "./output.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800">
        {children}
      </body>
    </html>
  );
}
