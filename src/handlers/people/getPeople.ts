import { APIGatewayEvent } from "aws-lambda";

export async function getPeopleHandler(event: APIGatewayEvent) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from getPeople",
      event,
    }),
  };
}

export { getPeopleHandler as handler };
