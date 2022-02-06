import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import httpProxyMiddleware from 'next-http-proxy-middleware'

const { serverRuntimeConfig } = getConfig()

export default function proxyHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return httpProxyMiddleware(req, res, {
    target: serverRuntimeConfig.apiBaseUrl,
    changeOrigin: true
  })
}

export const config = {
  api: {
    bodyParser: false
  }
}
