/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

const imageDomains = []
if (process.env.IMAGE_DOMAIN) imageDomains.push(process.env.IMAGE_DOMAIN)

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    staticBaseUrl: process.env.API_BASE_URL
  },
  images: { domains: imageDomains },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    })
    return config
  }
})
