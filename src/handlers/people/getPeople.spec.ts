import { AWSMock } from "../lib/test/mock/aws.mock";
import { getPeopleHandler } from "./getPeople";

describe("Get poeple labmda handler unit test.", () => {
  test("should return one person if provided id is valid", async () => {
    let apiGatewayEventMock = AWSMock.generateApiGatewayEvent({});
    const response = await getPeopleHandler(apiGatewayEventMock);

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("message", "Hello from getPeople");
    expect(body).toHaveProperty("event");
  });
});
