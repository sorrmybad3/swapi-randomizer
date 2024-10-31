import { APIGatewayEvent } from "aws-lambda";
import { OKReponse } from "../http/response/ok.response";
import { handleError } from "../http/utils/http.error.utils";

type HandlerFunction = (event: APIGatewayEvent) => Promise<unknown>;

export function httpHandlerWrapper(handler: HandlerFunction) {
  return async (event: APIGatewayEvent) => {
    try {
      const result = await handler(event);
      return new OKReponse(result);
    } catch (error) {
      return handleError(error, "Failed to get person.");
    }
  };
}
