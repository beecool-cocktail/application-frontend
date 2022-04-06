/** @type {import('next').NextConfig} */

const imageDomains = []
if (process.env.IMAGE_DOMAIN) imageDomains.push(process.env.IMAGE_DOMAIN)

module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  serverRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    staticBaseUrl: process.env.API_BASE_URL
  },
  images: {
    domains: imageDomains
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
