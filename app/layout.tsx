import { Analytics } from "@vercel/analytics/react"
import {
  ClerkProvider,
  SignedOut,
  UserButton,
  RedirectToSignIn,
  ClerkLoaded
} from '@clerk/nextjs'

import "./globals.css"

export const metadata = {
  generator: "Next.js",
  applicationName: "seemail",
  keywords: ["seemail", "nextjs", "puppeteer"],
  authors: [{ name: "Josh", url: "https://hwhite.dev/" }],
  themeColor: "slate",
  colorScheme: "dark",
  title: "Seemail",
  description: "Automate adding authorized devices to your account.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html className="dark" lang="en">
        <body className="text-primary-content bg-base-100 flex h-screen place-items-center items-center overflow-hidden antialiased">
            <ClerkLoaded>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <div className="flex flex-col gap-4 items-center mx-auto">
                <UserButton />
                {children}
              </div>
            </ClerkLoaded>
        </body>
      </html>
      <Analytics />
    </ClerkProvider>
  )
}
