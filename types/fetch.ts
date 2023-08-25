export interface ApiResponse<D> {
  status: number;
  statusText: string;
  data: D;
  error: ErrorResponse;
  loading: boolean;
};

export interface ErrorResponse {
  message: string;
  code: number;
}
