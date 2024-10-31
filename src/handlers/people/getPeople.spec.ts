import { AWSMock } from "../../lib/test/mock/aws.mock";
import { getPeopleHandler } from "./getPeople";

describe("Get poeple labmda handler unit test.", () => {
  test("should return one person if provided id is valid", async () => {
    let apiGatewayEventMock = AWSMock.generateApiGatewayEvent({});
    const response = await getPeopleHandler(apiGatewayEventMock);;
    const { body = "", statusCode } = response || {};

    const data = JSON.parse(body);
    expect(statusCode).toBe(200);
    expect(data).toHaveProperty("message", "Hello from getPeople");
    expect(data).toHaveProperty("event");
  });
});
