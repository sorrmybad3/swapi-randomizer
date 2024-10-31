import 'reflect-metadata';
import { injectable, singleton } from "tsyringe";
import { z } from "zod";

export enum EnvEnum {
  SWAPI_ROOT_URL = 'SWAPI_ROOT_URL',
  SWAPI_PEOPLE_ENDPOINT = 'SWAPI_PEOPLE_URL'
}

const envSchema = z.object({
  SWAPI_ROOT_URL: z.string(),
  SWAPI_PEOPLE_ENDPOINT: z.string()
});

@injectable()
@singleton()
export class Config {
  private static instance: Config;
  private SWAPI_ROOT_URL = 'https://swapi.dev/api/';
  private SWAPI_PEOPLE_ENDPOINT = 'people/';

  constructor() {
    const env = envSchema.parse({
      SWAPI_ROOT_URL: process.env.SWAPI_ROOT_URL || 'https://swapi.dev/api/',
      SWAPI_PEOPLE_ENDPOINT: process.env.SWAPI_PEOPLE_ENDPOINT || 'people/'
    });

    this.SWAPI_ROOT_URL = env.SWAPI_ROOT_URL;
    this.SWAPI_PEOPLE_ENDPOINT = env.SWAPI_PEOPLE_ENDPOINT;
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public get(key: EnvEnum): string {
    switch (key) {
      case EnvEnum.SWAPI_ROOT_URL:
        return this.SWAPI_ROOT_URL;
      case EnvEnum.SWAPI_PEOPLE_ENDPOINT:
        return this.SWAPI_PEOPLE_ENDPOINT;
      default:
        return "";
    }
  }
}