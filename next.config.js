/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-scripts.com;
    connect-src 'self' ${process.env.NEXT_PUBLIC_URL.replace('https', 'ws')} ${process.env.NEXT_PUBLIC_URL} https://enterpin-cdpo6kodna-uc.a.run.app https://get-code-from-email-cdpo6kodna-uc.a.run.app;
    worker-src 'self' blob: ${process.env.NEXT_PUBLIC_URL};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
`

const nextConfig = {
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
