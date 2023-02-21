module.exports = {
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
