import { ResponseComposition, rest, RestContext } from 'msw'
import { ApiResponse } from 'lib/types/api/responseBase'
import responseCode from 'lib/constants/responseCode'
import mockConfig from './data/config'
import mockDrafts from './data/cocktailPostDraftList'
import mockCocktailPost from './data/cocktailPost'
import mockCocktailList from './data/cocktailList'
import mockUserInfo from './data/userInfo'

const responseJson = <T>(
  res: ResponseComposition,
  ctx: RestContext,
  data: T
) => {
  const body: ApiResponse<T> = {
    error_code: responseCode.SUCCESS,
    error_message: '',
    data
  }
  return res(ctx.status(200), ctx.json(body))
}

const userInfoHandler = rest.get('/api/user/info', (req, res, ctx) =>
  responseJson(res, ctx, mockUserInfo)
)

const configHandler = rest.get('/api/config', (req, res, ctx) =>
  responseJson(res, ctx, mockConfig)
)
const cocktailListHandler = rest.get('/api/cocktails', (req, res, ctx) =>
  responseJson(res, ctx, mockCocktailList)
)
const cocktailPostHandler = rest.get('/api/cocktails/:id', (req, res, ctx) =>
  responseJson(res, ctx, mockCocktailPost)
)
const draftListHandler = rest.get('/api/cocktail-drafts', (_req, res, ctx) =>
  responseJson(res, ctx, mockDrafts)
)
const draftHandler = rest.get('/api/cocktail-draft/:id', (_req, res, ctx) =>
  responseJson(res, ctx, mockDrafts[0])
)

export const appHandlers = []
export const storybookHandlers = [
  configHandler,
  userInfoHandler,
  cocktailListHandler,
  cocktailPostHandler,
  draftListHandler,
  draftHandler
]
