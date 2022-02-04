/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    staticBaseUrl: process.env.API_BASE_URL
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN]
  }
}
