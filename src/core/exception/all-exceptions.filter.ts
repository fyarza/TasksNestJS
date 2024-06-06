import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
  MessageExceptionResponse,
} from './models/http-exception-response.interface';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;
    let message: string | string[] | MessageExceptionResponse;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
      message =
        (errorResponse as HttpExceptionResponse).message || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurered!';
      message: '';
    }

    const errorResponse: CustomHttpExceptionResponse = this.getErrorResponse(
      status,
      errorMessage,
      request,
      message,
    );

    this.writeErrorLogToFile(this.logError(errorResponse, request, exception));
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
    message?: string | string[] | MessageExceptionResponse,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    message,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private logError = (
    errorResponse: CustomHttpExceptionResponse,
    request: Request,
    exception: any,
  ): string => {
    const { statusCode, error } = errorResponse;
    const { url, method } = request;
    const errorLog = `Response Code:${statusCode} - Method: ${method} -  URL: ${url}\n\n
    ${JSON.stringify(errorResponse)}\n\n
    ${exception instanceof HttpException ? exception.stack : error}
    `;
    return errorLog;
  };

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile('error.log', errorLog, 'utf8', (err) => {
      if (err) throw err;
    });
  };
}
