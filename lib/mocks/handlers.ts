import { rest } from 'msw'
import { Cocktail, CocktailPost, CocktailPostDraft } from 'lib/types/cocktail'
import Config from 'lib/types/config'
import { ApiResponse, PaginationResponse } from 'lib/types/api/responseBase'
import responseCode from 'lib/constants/responseCode'
import mockConfig from './data/config'
import mockDrafts from './data/drafts'
import mockCocktailPost from './data/cocktail'
import mockCocktailList from './data/cocktailList'

const configHandler = rest.get('/api/config', (req, res, ctx) => {
  const body: ApiResponse<Config> = {
    error_code: responseCode.SUCCESS,
    error_message: '',
    data: mockConfig
  }
  return res(ctx.status(200), ctx.json(body))
})

const cocktailListHandler = rest.get('/api/cocktails', (req, res, ctx) => {
  const body: ApiResponse<PaginationResponse<Cocktail>> = {
    error_code: responseCode.SUCCESS,
    error_message: '',
    data: mockCocktailList
  }
  return res(ctx.status(200), ctx.json(body))
})

const cocktailPostHandler = rest.get('/api/cocktails/:id', (req, res, ctx) => {
  const body: ApiResponse<CocktailPost> = {
    error_code: responseCode.SUCCESS,
    error_message: '',
    data: mockCocktailPost
  }
  return res(ctx.status(200), ctx.json(body))
})

const draftHandler = rest.get('/api/drafts', (_req, res, ctx) => {
  const body: ApiResponse<CocktailPostDraft[]> = {
    error_code: responseCode.SUCCESS,
    error_message: '',
    data: mockDrafts
  }
  return res(ctx.status(200), ctx.json(body))
})

export const appHandlers = [
  configHandler,
  cocktailListHandler,
  cocktailPostHandler,
  draftHandler
]
export const storybookHandlers = [
  configHandler,
  cocktailListHandler,
  cocktailPostHandler,
  draftHandler
]
