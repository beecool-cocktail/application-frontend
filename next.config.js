/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        has: [{ type: 'host', value: 'localhost' }],
        source: '/api/:path*',
        destination: 'http://localhost:6969/api/:path*'
      },
      {
        has: [{ type: 'host', value: 'localhost' }],
        source: '/static/:path*',
        destination: 'http://localhost:6969/static/:path*'
      },
      {
        has: [
          {
            type: 'host',
            value: 'application-frontend-mhkzpmkvca-de.a.run.app'
          }
        ],
        source: '/api/:path*',
        destination: 'http://whisperingcorner.zapto.org/api/:path*'
      },
      {
        has: [
          {
            type: 'host',
            value: 'application-frontend-mhkzpmkvca-de.a.run.app'
          }
        ],
        source: '/static/:path*',
        destination: 'http://whisperingcorner.zapto.org/static/:path*'
      }
    ]
  }
}
