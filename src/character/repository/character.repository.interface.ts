import { CharacterSchema } from "../entity/character.entity";
import { DynamoDocumentItemType } from "../../lib/types/dynamo.types";

export interface CharacterRepositoryI {
  createCharacter(character: CharacterSchema): Promise<DynamoDocumentItemType>;
  findOneCharacter(id: string): Promise<DynamoDocumentItemType>;
}
