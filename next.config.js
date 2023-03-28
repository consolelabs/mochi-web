const isProduction = process.env.NODE_ENV === 'production'

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

    if (isProduction) {
      redirects.push({
        source: '/dashboard/:slug*',
        destination: '/',
        permanent: false,
      })
    }

    return redirects
  },
}
