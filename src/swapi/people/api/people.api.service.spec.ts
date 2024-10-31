import axios from "axios";
import { PeopleApiService } from "./people.api.service";
import { SWAPIMock } from "../../../lib/test/mock/swapi.mock";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("PeopleApiService Test", () => {
  let peopleApiService: PeopleApiService = new PeopleApiService();
  let rootUrl = "https://swapi.dev/api";
  let endpoint = "people";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a character by ID", async () => {
    const person = SWAPIMock.getOnePerson();
    const personId = 1;
    mockedAxios.get.mockResolvedValueOnce({ data: person });

    const result = await peopleApiService.get(personId);
    expect(result).toEqual(person);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${rootUrl}/${endpoint}/${personId}`,
    );
  });
});
