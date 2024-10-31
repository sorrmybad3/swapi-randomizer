import "reflect-metadata";
import { container } from "tsyringe";
import { SWAPIMock } from "../../../lib/test/mock/swapi.mock";
import { PeopleApiService } from "../api/people.api.service";
import { PeopleService } from "./people.service";
import { PeopleSchema } from "../entity/people.schema";

describe("People Service Unit test", () => {
  let peopleService: PeopleService;
  let person = SWAPIMock.getOnePerson();
  let peopleApiServiceMock: PeopleApiService = {
    get: jest.fn().mockResolvedValue(person),
  } as unknown as PeopleApiService;

  beforeAll(() => {
    container.register(PeopleApiService, { useValue: peopleApiServiceMock });
    peopleService = container.resolve(PeopleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a character by ID", async () => {
    const spy = jest.spyOn(peopleApiServiceMock, "get");
    const result = await peopleService.findPeople(1);
    expect(result).toStrictEqual(new PeopleSchema("Luke Skywalker", "172"));
    expect(spy).toHaveBeenCalledWith(1);
  });
});
