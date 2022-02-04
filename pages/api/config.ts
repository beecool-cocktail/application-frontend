import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
const { apiBaseUrl, staticBaseUrl } = serverRuntimeConfig

export default function configHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET')
    res.status(200).json({ apiBaseUrl: apiBaseUrl, staticBaseUrl })
  res.status(404).end()
}
