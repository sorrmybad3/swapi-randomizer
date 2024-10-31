import 'reflect-metadata'
import { inject, injectable } from "tsyringe";
import { CharacterSchema } from "../entity/character.entity";
import { CharacterServiceI } from "./character.service.interface";
import { CharacterRepository } from "../repository/character.repository";
import { CreateCharacterDto } from "../dto/create.character.dto";
import { CharacterUtils } from '../utils/character.utils';

@injectable()
export class CharacterService implements CharacterServiceI {
  constructor(@inject(CharacterRepository) private readonly characterRepository: CharacterRepository) {}

  async createCharacter(character: CreateCharacterDto): Promise<CharacterSchema> {
    const output = await this.characterRepository.createCharacter(character);
    return CharacterUtils.fromItemTo(output)!;
  }

  async findOneCharacter(id: string): Promise<CharacterSchema> {
    const output = await this.characterRepository.findOneCharacter(id);
    return CharacterUtils.fromItemTo(output)!;
  }
}