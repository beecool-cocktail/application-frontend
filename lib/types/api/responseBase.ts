export interface ApiResponse<T> {
  data: T
  error_code?: string
  error_message?: string
}
