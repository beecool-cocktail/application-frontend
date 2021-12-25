/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/google-login',
        destination: 'http://localhost:6969/api/google-login'
      },
      {
        source: '/api/google-authenticate',
        destination: 'http://localhost:6969/api/google-authenticate'
      }
    ]
  }
}
