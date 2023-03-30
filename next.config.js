const isProduction = process.env.NODE_ENV === 'production'
const isBeta = process.env.NEXT_PUBLIC_BETA_PAGE === 'true'

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

    // TODO: remove after done dashboard
    if (isProduction && !isBeta) {
      redirects.push({
        source: '/dashboard/:slug*',
        destination: '/',
        permanent: false,
      })
    }

    return redirects
  },
}
