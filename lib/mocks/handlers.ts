import { ResponseComposition, rest, RestContext } from 'msw'
import { ApiResponse } from 'lib/types/responseBase'
import responseCode from 'lib/constants/responseCode'
import mockConfig from './data/config'

export const responseJson = <T>(
  res: ResponseComposition,
  ctx: RestContext,
  data: T,
  delay = 1000
) => {
  const body: ApiResponse<T> = {
    error_code: responseCode.SUCCESS,
    error_message: '',
    data
  }
  return res(ctx.status(200), ctx.delay(delay), ctx.json(body))
}

export const configHandler = rest.get('/api/config', (req, res, ctx) =>
  responseJson(res, ctx, mockConfig)
)

export const appHandlers = []
