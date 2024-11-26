/* * */

import createNextIntlPlugin from 'next-intl/plugin'

/* * */

const withNextIntl = createNextIntlPlugin()

/* * */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'spginecologia.pt',
        port: '',
        protocol: 'https',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      //
    ]
  },
}

/* * */

export default withNextIntl(nextConfig)
