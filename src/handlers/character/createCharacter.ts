import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { httpHandlerWrapper } from "../../lib/wrapper/http.wrapper";
import { container } from "tsyringe";
import { CharacterService } from "../../character/service/character.service";
import { MapperUtils } from "../../lib/mapper/mapper.utils";
import { CreateCharacterDto } from "../../character/dto/create.character.dto";

export async function createCharacter(event: APIGatewayEvent) {
  let characterService = container.resolve(CharacterService);
  let { body = "" } = event
  const dto = await MapperUtils.map(CreateCharacterDto, JSON.parse(body || ""));
  return await characterService.createCharacter(dto);
}

export const createCharacterHandler = httpHandlerWrapper(createCharacter);
