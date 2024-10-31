import { BaseResponse } from "../response/base.response";

export class FatalErrorException extends BaseResponse {
  constructor(body?: unknown) {
    super(500, body);
  }
}
