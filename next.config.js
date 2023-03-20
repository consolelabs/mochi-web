/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: false,
  },
  async redirects() {
    return [
      {
        source: '/add',
        destination: process.env.INVITE_LINK,
        permanent: false,
      },
    ]
  },
}
