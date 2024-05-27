/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    script-src https://clerk.seemail.dev https://*.clerk.accounts.dev https://*.vercel-scripts.com 'self' 'unsafe-eval' 'unsafe-inline';
    connect-src https://clerk.seemail.dev https://*.clerk.accounts.dev ${process.env.NEXT_PUBLIC_URL.replace('https', 'ws')} ${process.env.NEXT_PUBLIC_URL} 'self';
    worker-src ${process.env.NEXT_PUBLIC_URL} blob:;
    style-src 'self' 'unsafe-inline';
    img-src https://img.clerk.com 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.run.app',
      },
    ],
  },
  env: {
    ENTERPIN_URL: process.env.ENTERPIN_URL,
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
