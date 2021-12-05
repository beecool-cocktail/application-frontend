/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/google-login',
        destination: 'http://localhost:8080/api/google-login'
      }
    ]
  }
}
