import getConfig from 'next/config'
import { ApiResponse } from 'lib/application/types/responseBase'
import Config from 'lib/application/types/config'
import ResponseCode from 'lib/application/constants/responseCode'
import type { NextApiRequest, NextApiResponse } from 'next'

const { serverRuntimeConfig } = getConfig()
const { apiBaseUrl, staticBaseUrl } = serverRuntimeConfig

export default function configHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') res.status(404).end()
  const resBody: ApiResponse<Config> = {
    error_code: ResponseCode.SUCCESS,
    error_message: '',
    data: { apiBaseUrl, staticBaseUrl }
  }
  res.status(200).json(resBody)
}
