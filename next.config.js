/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    staticBaseUrl: process.env.API_BASE_URL
  },
  async rewrites() {
    const source = '/static/:path*'
    let destination = source
    if (process.env.API_BASE_URL)
      destination = process.env.API_BASE_URL + source

    return [{ source, destination }]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'http',
        hostname: 'whispering-server'
      },
      {
        protocol: 'https',
        hostname: 'whispering.serveblog.net'
      },
      {
        protocol: 'https',
        hostname: 'application-frontend-mhkzpmkvca-de.a.run.app'
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    })
    return config
  }
}
module.exports = withPWA(config)
