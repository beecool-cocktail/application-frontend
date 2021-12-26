/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:6969/api/:path*'
      },
      {
        source: '/static/:path*',
        destination: 'http://localhost:6969/static/:path*'
      }
    ]
  }
}
