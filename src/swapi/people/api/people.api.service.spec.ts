import 'reflect-metadata';
import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";
import { PeopleApiService } from "./people.api.service";
import { SWAPIMock } from "../../../lib/test/mock/swapi.mock";
import { container } from 'tsyringe';
import { Config, EnvEnum } from '../../../config/config';

const mockedAxios = new MockAdapter(axios);

describe("PeopleApiService Test", () => {
  let config: Config = container.resolve(Config);
  let peopleApiService: PeopleApiService = container.resolve(PeopleApiService);
  let rootUrl = config.get(EnvEnum.SWAPI_ROOT_URL);
  let endpoint = config.get(EnvEnum.SWAPI_PEOPLE_ENDPOINT);
  let personId = 1;
  let path = `${rootUrl}/${endpoint}/${personId}`;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a character by ID", async () => {
    const person = SWAPIMock.getOnePerson();
    const spy = jest.spyOn(axios, "get");
    mockedAxios.onGet(path).replyOnce(200, person);
    const result = await peopleApiService.get(personId);

    expect(result).toEqual(person);
    expect(spy).toHaveBeenCalledWith(path);
    expect(spy).toHaveBeenCalled();
  });

  it("should fetch a character by ID and return an error", async () => {
    mockedAxios.onGet(path).replyOnce(404, {
      detail: "Not found",
    });
    try {
      await peopleApiService.get(1);
      fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
      const axiosError = error as AxiosError;
      expect(axiosError.response?.status).toEqual(404);
      expect(axiosError.response?.data).toEqual({ detail: "Not found" });
    }
  });

  it("should throw timeout error", async () => {
    mockedAxios.onGet(path).timeout();
    try {
      await peopleApiService.get(1);
      fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
      const axiosError = error as AxiosError;
      expect(axiosError.code).toEqual("ECONNABORTED");
    }
  });
});
