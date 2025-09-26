class ApiResponse {
  statusCode: number;
  data: Record<string, any> | null;
  error: Record<string, any> | null;
  message: string;
  isSuccess: boolean;

  constructor(
    statusCode: number = 200,
    data: Record<string, any> | null = null,
    message: string = "Success",
  ) {
    this.isSuccess = statusCode < 400;
    this.statusCode = statusCode;
    this.data = this.isSuccess ? data : null;
    this.error = this.isSuccess ? null : data;
    this.message = message;
  }
}

export { ApiResponse };
