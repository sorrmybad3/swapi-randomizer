import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { httpHandlerWrapper } from "../../lib/wrapper/http.wrapper";
import { container } from "tsyringe";
import { PeopleService } from "../../swapi/people/service/people.service";

export async function getPeople(event: APIGatewayEvent) {
  let peopleService = container.resolve(PeopleService);
  return await peopleService.findPeople(1);
}

export const getPeopleHandler = httpHandlerWrapper(getPeople);
