/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/static/:path*', destination: '/api/static/:path*' }
      ]
    }
  },
  serverRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    staticBaseUrl: process.env.STATIC_BASE_URL
  }
}
