import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { CharacterSchema } from "../entity/character.entity";

export interface CharacterRepositoryI {
  createCharacter(character: CharacterSchema): Promise<GetItemCommandOutput>
}