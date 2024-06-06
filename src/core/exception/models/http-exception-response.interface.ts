export interface MessageExceptionResponse {
  error: string;
  field: string;
}

export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
  message?: string | string[] | MessageExceptionResponse;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
