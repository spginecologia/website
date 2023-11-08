/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'spginecologia.pt', port: '' }],
  },
  async redirects() {
    return [
      //   {
      //     source: '/source',
      //     destination: '/destination',
      //     permanent: true,
      //   },
    ];
  },
};
