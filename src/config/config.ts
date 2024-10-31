import 'reflect-metadata';
import { injectable, singleton } from "tsyringe";
import { z } from "zod";

export enum EnvEnum {
  SWAPI_ROOT_URL = 'SWAPI_ROOT_URL',
  SWAPI_PEOPLE_ENDPOINT = 'SWAPI_PEOPLE_URL',

  AWS_REGION = 'AWS_REGION',
  AWS_DYNAMODB_ENDPOINT = 'AWS_DYNAMODB_ENDPOINT',
  AWS_DYNAMO_CHARACTERS_TABLE = 'AWS_DYNAMODB_TABLE_NAME'
}

const envSchema = z.object({
  SWAPI_ROOT_URL: z.string(),
  SWAPI_PEOPLE_ENDPOINT: z.string(),

  AWS_REGION: z.string(),
  AWS_DYNAMODB_ENDPOINT: z.string(),
  AWS_DYNAMO_CHARACTERS_TABLE: z.string()
});

@injectable()
@singleton()
export class Config {
  private static instance: Config;
  private SWAPI_ROOT_URL = 'https://swapi.dev/api/';
  private SWAPI_PEOPLE_ENDPOINT = 'people/';

  private AWS_REGION = 'us-east-1';
  private AWS_DYNAMODB_ENDPOINT = 'http://localhost:8000';
  private AWS_DYNAMO_CHARACTERS_TABLE = 'Characters';

  constructor() {
    const env = envSchema.parse({
      SWAPI_ROOT_URL: process.env.SWAPI_ROOT_URL || 'https://swapi.dev/api/',
      SWAPI_PEOPLE_ENDPOINT: process.env.SWAPI_PEOPLE_ENDPOINT || 'people/',

      AWS_REGION: process.env.AWS_REGION || 'us-east-1',
      AWS_DYNAMODB_ENDPOINT: process.env.AWS_DYNAMODB_ENDPOINT || 'http://localhost:8000',
      AWS_DYNAMODB_TABLE_NAME: process.env.AWS_DYNAMO_CHARACTERS_TABLE || 'Characters'
    });

    this.SWAPI_ROOT_URL = env.SWAPI_ROOT_URL;
    this.SWAPI_PEOPLE_ENDPOINT = env.SWAPI_PEOPLE_ENDPOINT;
    this.AWS_REGION = env.AWS_REGION;
    this.AWS_DYNAMODB_ENDPOINT = env.AWS_DYNAMODB_ENDPOINT;
    this.AWS_DYNAMO_CHARACTERS_TABLE = env.AWS_DYNAMO_CHARACTERS_TABLE;
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
      case EnvEnum.AWS_REGION:
        return this.AWS_REGION;
      case EnvEnum.AWS_DYNAMODB_ENDPOINT:
        return this.AWS_DYNAMODB_ENDPOINT;
      case EnvEnum.AWS_DYNAMO_CHARACTERS_TABLE:
        return this.AWS_DYNAMO_CHARACTERS_TABLE;
      default:
        return "";
    }
  }
}