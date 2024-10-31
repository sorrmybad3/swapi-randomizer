import { injectable } from "tsyringe";
import { CharacterSchema } from "../entity/character.entity";
import { CharacterRepositoryI } from "./character.repository.interface";
import { CreateCharacterDto } from "../dto/create.character.dto";
import { DynamoDBClient, GetItemCommand, GetItemCommandOutput, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4} from 'uuid'
import { faker } from "@faker-js/faker/.";
import { MapperUtils } from "../../lib/mapper/mapper.utils";

@injectable()
export class CharacterRepository implements CharacterRepositoryI {
  private readonly dynamoDb = new DynamoDBClient({region: 'us-east-1'});
  private readonly TABLE_NAME = 'Characters';

  async createCharacter(dto: CreateCharacterDto): Promise<GetItemCommandOutput> {
    let uuid = uuidv4();
    const putCharacterItem = {
      TableName: this.TABLE_NAME,
      Item: {
        id: { S: uuid },
        nombre: { S: dto?.nombre || faker.name.firstName() },
        altura: { N: (dto?.altura || 160).toString() },
      },
    };
    await this.dynamoDb.send(new PutItemCommand(putCharacterItem));

    const lookupCharacterItem = {
      TableName: this.TABLE_NAME,
      Key: {
        id: { S: uuid },
      },
    };
    return await this.dynamoDb.send(new GetItemCommand(lookupCharacterItem));
  }
}