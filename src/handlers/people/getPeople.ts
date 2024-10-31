import { APIGatewayEvent } from "aws-lambda";
import { httpHandlerWrapper } from "../../lib/wrapper/http.wrapper";

export async function getPeople(event: APIGatewayEvent) {
  return {
    message: "Hello from getPeople",
    event,
  }
}

export const getPeopleHandler = httpHandlerWrapper(getPeople);

export default { 
  handler: getPeopleHandler
};
