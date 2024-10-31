import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { CharacterRepositoryI } from "./character.repository.interface";
import { CreateCharacterDto } from "../dto/create.character.dto";
import {
  DynamoDB,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { DynamoDocumentItemType } from "../../lib/types/dynamo.types";
import { Config } from "../../config/config";

@injectable()
export class CharacterRepository implements CharacterRepositoryI {
  constructor(@inject(Config) private readonly config: Config) {}

  private readonly dynamoDb = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://localhost:8000",
  });
  private readonly TABLE_NAME = "Characters";
  doc = DynamoDB;

  async createCharacter(
    dto: CreateCharacterDto,
  ): Promise<DynamoDocumentItemType> {
    let uuid = uuidv4();
    const putCharacterItem = {
      TableName: this.TABLE_NAME,
      Item: {
        id: { S: uuid },
        nombre: { S: dto?.nombre || faker.person.firstName() },
        altura: { N: (dto?.altura || 160).toString() },
      },
    };
    await this.dynamoDb.send(new PutItemCommand(putCharacterItem));

    return await this.findOneCharacter(uuid);
  }

  async findOneCharacter(id: string): Promise<DynamoDocumentItemType> {
    const lookupCharacterItem = {
      TableName: this.TABLE_NAME,
      Key: {
        id: { S: id },
      },
    };
    const lookupResult = await this.dynamoDb.send(
      new GetItemCommand(lookupCharacterItem),
    );
    return lookupResult.Item;
  }
}
