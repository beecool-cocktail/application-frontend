import { ResponseComposition, rest, RestContext } from 'msw'
import { ApiResponse } from 'lib/application/types/responseBase'
import responseCode from 'lib/application/constants/responseCode'
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

export const appHandlers = [
  rest.get('http://localhost:6969/api/cocktails/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        error_code: '00000',
        error_message: 'success'
      })
    )
    // return res(
    //   ctx.status(200),
    //   ctx.delay(1000),
    //   ctx.json({
    //     error_code: '00001',
    //     error_message: 'failed'
    //   })
    // )
    // res.networkError('Failed to connect')
    // return res(ctx.status(500), ctx.delay(1000))
    // return res(ctx.status(401), ctx.delay(1000))
  }),
  rest.post(
    'http://localhost:6969/api/users/current/favorite-cocktails',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          error_code: '00000',
          error_message: 'success'
        })
      )
      // return res(
      //   ctx.status(200),
      //   ctx.delay(1000),
      //   ctx.json({
      //     error_code: '00001',
      //     error_message: 'failed'
      //   })
      // )
      // res.networkError('Failed to connect')
      // return res(ctx.status(500), ctx.delay(1000))
      // if (req.headers.get('Authorization')) {
      //   return res(ctx.status(401), ctx.delay(1000))
      // } else {
      //   return res(
      //     ctx.status(200),
      //     ctx.delay(1000),
      //     ctx.json({
      //       error_code: '00000',
      //       error_message: 'success',
      //       data: {
      //         popular_cocktail_list: [],
      //         total: 1000
      //       }
      //     })
      //   )
      // }
    }
  ),
  rest.get(
    'http://localhost:6969/api/cocktails?page=1&page_size=5&keyword=',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          error_code: '00000',
          error_message: 'success'
        })
      )
      // return res(
      //   ctx.status(200),
      //   ctx.delay(1000),
      //   ctx.json({
      //     error_code: '00001',
      //     error_message: 'failed'
      //   })
      // )
      // res.networkError('Failed to connect')
      // return res(ctx.status(500), ctx.delay(1000))
      // if (req.headers.get('Authorization')) {
      //   return res(ctx.status(401), ctx.delay(1000))
      // } else {
      //   return res(
      //     ctx.status(200),
      //     ctx.delay(1000),
      //     ctx.json({
      //       error_code: '00000',
      //       error_message: 'success',
      //       data: {
      //         popular_cocktail_list: [],
      //         total: 1000
      //       }
      //     })
      //   )
      // }
    }
  )
]
