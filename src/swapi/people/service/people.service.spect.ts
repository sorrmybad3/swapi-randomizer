import "reflect-metadata";
import { container } from "tsyringe";
import { SWAPIMock } from "../../../lib/test/mock/swapi.mock";
import { PeopleApiService } from "../api/people.api.service";
import { PeopleService } from "./people.service";

describe("People Service", () => {
  let peopleService: PeopleService;
  let peopleApiServiceMock: PeopleApiService;
  let person = SWAPIMock.getOnePerson();

  beforeAll(() => {
    const peopleApiServiceMock = {
      get: jest.fn().mockResolvedValue(person),
    } as unknown as PeopleApiService;

    container.register(PeopleApiService, { useValue: peopleApiServiceMock });
    peopleService = container.resolve(PeopleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a character by ID", async () => {
    const result = await peopleService.findPeople(1);
    expect(result).toStrictEqual(person);
    expect(peopleApiServiceMock.get).toHaveBeenCalledWith(1);
  });
});
