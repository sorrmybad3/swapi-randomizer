import { BaseResponse } from "../response/base.response";

export class NotFoundException extends BaseResponse {
  constructor(body?: unknown) {
    super(404, body);
  }
}
