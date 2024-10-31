import "reflect-metadata";
import { container } from "tsyringe";
import { AWSMock } from "../../lib/test/mock/aws.mock";
import { PeopleMock } from "../../lib/test/mock/people.mock";
import { PeopleSchema } from "../../swapi/people/entity/people.schema";
import { getPeopleHandler } from "./getPeople";
import { PeopleService } from "../../swapi/people/service/people.service";

describe("Get poeple labmda handler unit test.", () => {
  let mockFindPeople: jest.Mock;
  let person: PeopleSchema;

  beforeAll(() => {
    person = PeopleMock.generatePeople();
    mockFindPeople = jest.fn().mockResolvedValue(person);
    const mockPeopleService = {
      findPeople: mockFindPeople,
    } as unknown as PeopleService;

    container.register(PeopleService, {
      useValue: mockPeopleService,
    });
  });

  test("should return one person if provided id is valid", async () => {
    let apiGatewayEventMock = AWSMock.generateApiGatewayEvent({});
    const response = await getPeopleHandler(apiGatewayEventMock);
    const { body = "", statusCode } = response || {};

    const data = JSON.parse(body);
    expect(statusCode).toBe(200);
    expect(data).toStrictEqual(person);
  });
});
