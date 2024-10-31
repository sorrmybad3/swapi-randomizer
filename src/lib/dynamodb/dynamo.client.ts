import "reflect-metadata";
import { container, inject, injectable } from "tsyringe";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Config, EnvEnum } from "../../config/config";

@injectable()
export class DynamoDBClientProvider {
  private client: DynamoDBClient;

  constructor(@inject(Config) private readonly config: Config) {
    this.client = new DynamoDBClient({
      region: this.config.get(EnvEnum.AWS_REGION),
      endpoint: this.config.get(EnvEnum.AWS_DYNAMODB_ENDPOINT),
    });
  }

  public getClient(): DynamoDBClient {
    return this.client;
  }
}

container.registerSingleton(DynamoDBClientProvider);
