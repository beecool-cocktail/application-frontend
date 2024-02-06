export default interface Pagination {
  pageIndex: number
  pageSize: number
}

export interface Page<T> {
  total: number
  data: T[]
}
