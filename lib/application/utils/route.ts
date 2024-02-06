import { ParsedUrlQueryInput } from 'querystring'

export const getUrlByQuery = (path: string, query: ParsedUrlQueryInput) => ({
  pathname: path,
  query
})

export const getUrlById = (path: string, id: string | number) =>
  getUrlByQuery(path, { id })
