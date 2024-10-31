import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { httpHandlerWrapper } from "../../lib/wrapper/http.wrapper";
import { container } from "tsyringe";
import { PeopleService } from "../../swapi/people/service/people.service";

export async function getPeople(event: APIGatewayEvent) {
  let peopleService = container.resolve(PeopleService);
  let { pathParameters } = event
  let { id = 1 } = pathParameters || {};
  return await peopleService.findPeople(+id);
}

export const getPeopleHandler = httpHandlerWrapper(getPeople);
