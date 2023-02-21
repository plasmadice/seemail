import "./output.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body className="dark:bg-gray-800">{children}</body>
    </html>
  );
}
