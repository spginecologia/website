/* * */

const withNextIntl = require('next-intl/plugin')();

/* * */

module.exports = withNextIntl({
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
});
