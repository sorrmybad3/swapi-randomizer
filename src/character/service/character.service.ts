import { inject, injectable } from "tsyringe";
import { CharacterSchema } from "../entity/character.entity";
import { CharacterServiceI } from "./character.service.interface";
import { CharacterRepository } from "../repository/character.repository";
import { CreateCharacterDto } from "../dto/create.character.dto";
import { MapperUtils } from "../../lib/mapper/mapper.utils";

@injectable()
export class CharacterService implements CharacterServiceI {
  constructor(@inject(CharacterRepository) private readonly characterRepository: CharacterRepository) {}

  async createCharacter(character: CreateCharacterDto): Promise<CharacterSchema> {
    const output = this.characterRepository.createCharacter(character);
    return await MapperUtils.map(CharacterSchema, output);
  }
}