import { APIGatewayEvent } from "aws-lambda";

async function handler(event: APIGatewayEvent) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from getPeople",
      event,
    }),
  };
}

module.exports = { handler };
