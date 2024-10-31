import { BaseResponse } from "./base.response";

export class OKReponse extends BaseResponse {
  constructor(body?: unknown) {
    super(200, body);
  }
}
