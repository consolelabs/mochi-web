/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
      },
    ],
  },
  async redirects() {
    const redirects = [
      {
        source: '/add',
        destination: process.env.INVITE_LINK,
        permanent: false,
      },
    ]

    return redirects
  },
}
