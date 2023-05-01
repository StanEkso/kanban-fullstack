export interface ApiError {
  error: string;
  statusCode: number;
}

export interface ApiErrorWithDetails extends ApiError {
  message: string | string[];
}
