// import { Analytics } from "@vercel/analytics/react"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  ClerkLoaded,
  UserButton
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
            <SignedIn>
              <div className="flex flex-col gap-4 items-center mx-auto">
                <UserButton />
                {children}
              </div>
            </SignedIn>
            <SignedOut>
              <div className="p-4 m-auto justify-center rounded-md flex flex-col gap-2 items-center bg-secondary text-secondary-content">
                <h1 className="text-3xl font-semibold">Seemail</h1>
                <p className="text-center text-lg">Automate adding authorized devices to your account.</p>
                <p className="text-center text-lg">Invite only</p>
                <div className="p-2 px-4 mt-2 bg-secondary-focus rounded-md">
                  <SignInButton />
                </div>
              </div>
            </SignedOut>
            {/* <Analytics /> */}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  )
}
