/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
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
