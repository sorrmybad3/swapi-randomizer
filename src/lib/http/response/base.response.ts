export class BaseResponse {
  readonly statusCode: number;
  readonly body?: string;

  constructor(statusCode: number, body?: unknown) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
  }
}
