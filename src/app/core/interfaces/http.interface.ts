export interface APIResponse<T> {
  timestamp: Date
  environment: string
  data?: T
  message?: string
  errors?: string[]
}