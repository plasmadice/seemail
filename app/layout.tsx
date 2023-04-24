import { Analytics } from '@vercel/analytics/react'

import './globals.css'

export const metadata = {
  generator: 'Next.js',
  applicationName: 'seemail',
  keywords: ['seemail', 'nextjs', 'puppeteer'],
  authors: [{ name: 'Josh', url: 'https://hwhite.dev/' }],
  themeColor: 'slate',
  colorScheme: 'dark',
  title: 'Seemail',
  description: 'Automate adding authorized devices to your account.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='dark' lang='en'>
      <body className='flex h-screen place-items-center items-center overflow-hidden bg-white text-slate-500 antialiased dark:bg-firefly dark:text-slate-400'>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
