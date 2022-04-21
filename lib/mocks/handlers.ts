import { ResponseComposition, rest, RestContext } from 'msw'
import { ApiResponse } from 'lib/types/responseBase'
import responseCode from 'lib/constants/responseCode'
import mockConfig from './data/config'
import mockDrafts from './data/cocktailPostDraftList'
import mockCocktailPost from './data/cocktailPost'
import mockCocktailList from './data/cocktailList'

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
export const cocktailListHandler = rest.get('/api/cocktails', (req, res, ctx) =>
  responseJson(res, ctx, mockCocktailList)
)
export const cocktailPostHandler = rest.get(
  '/api/cocktails/:id',
  (req, res, ctx) => responseJson(res, ctx, mockCocktailPost)
)
export const draftListHandler = rest.get(
  '/api/cocktail-drafts',
  (_req, res, ctx) => responseJson(res, ctx, mockDrafts)
)
export const draftHandler = rest.get(
  '/api/cocktail-draft/:id',
  (_req, res, ctx) => responseJson(res, ctx, mockDrafts[0])
)

export const appHandlers = []
export const storybookHandlers = [
  cocktailListHandler,
  cocktailPostHandler,
  draftListHandler,
  draftHandler
]
