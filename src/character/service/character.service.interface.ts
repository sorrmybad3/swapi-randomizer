import { CharacterSchema } from "../entity/character.entity";

export interface CharacterServiceI {
  createCharacter(character: CharacterSchema): Promise<CharacterSchema>
}