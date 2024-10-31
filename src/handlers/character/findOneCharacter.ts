import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { httpHandlerWrapper } from "../../lib/wrapper/http.wrapper";
import { container } from "tsyringe";
import { CharacterService } from "../../character/service/character.service";

export async function findOneCharacter(event: APIGatewayEvent) {
  let characterService = container.resolve(CharacterService);
  let { pathParameters } = event;
  let { id = "" } = pathParameters || {};
  return await characterService.findOneCharacter(id);
}

export const createCharacterHandler = httpHandlerWrapper(findOneCharacter);
