export class BaseResponse {
  private readonly statusCode: number;
  private readonly body?: string;

  constructor(statusCode: number, body?: unknown) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
  }
}
