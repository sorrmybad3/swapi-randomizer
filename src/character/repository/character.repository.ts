import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { CharacterRepositoryI } from "./character.repository.interface";
import { CreateCharacterDto } from "../dto/create.character.dto";
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { DynamoDocumentItemType } from "../../lib/types/dynamo.types";
import { Config, EnvEnum } from "../../config/config";
import { DynamoDBClientProvider } from "../../lib/dynamodb/dynamo.client";

@injectable()
export class CharacterRepository implements CharacterRepositoryI {
  private readonly TABLE_NAME: string = "";

  constructor(
    @inject(Config) private readonly config: Config,
    @inject(DynamoDBClientProvider)
    private readonly dbProvider: DynamoDBClientProvider,
  ) {
    this.config.get(EnvEnum.AWS_DYNAMO_CHARACTERS_TABLE);
  }

  async createCharacter(
    dto: CreateCharacterDto,
  ): Promise<DynamoDocumentItemType> {
    let uuid = uuidv4();
    const putCharacterItem = {
      TableName: this.TABLE_NAME,
      Item: {
        id: { S: uuid },
        nombre: { S: dto?.nombre || faker.person.firstName() },
        altura: {
          N: (
            dto?.altura ||
            faker.number.int({
              min: 140,
              max: 200,
            })
          ).toString(),
        },
      },
    };
    await this.dbProvider
      .getClient()
      .send(new PutItemCommand(putCharacterItem));
    return await this.findOneCharacter(uuid);
  }

  async findOneCharacter(id: string): Promise<DynamoDocumentItemType> {
    const lookupCharacterItem = {
      TableName: this.TABLE_NAME,
      Key: {
        id: { S: id },
      },
    };
    const lookupResult = await this.dbProvider
      .getClient()
      .send(new GetItemCommand(lookupCharacterItem));
    return lookupResult.Item;
  }
}
