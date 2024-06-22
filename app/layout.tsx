import { Analytics } from "@vercel/analytics/react"
import {
  ClerkProvider,
  SignedIn,
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
      <ClerkLoaded>
        <SignedIn>
          <html className="dark" lang="en">
            <body className="text-primary-content bg-base-100 flex h-screen place-items-center items-center overflow-hidden antialiased">
                  <div className="flex flex-col gap-4 items-center mx-auto">
                    <UserButton />
                    {children}
                  </div>
            </body>
          </html>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <Analytics />
      </ClerkLoaded>
    </ClerkProvider>
  )
}
