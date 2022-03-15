export interface ApiResponse<T> {
  data: T
  error_code?: string
  error_message?: string
}

export interface PaginationResponse<T> {
  total: number
  popular_cocktail_list: T[]
}
