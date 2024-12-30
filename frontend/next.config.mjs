/* * */

import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

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

const withNextIntl = createNextIntlPlugin()

export default withPayload(withNextIntl(nextConfig))
