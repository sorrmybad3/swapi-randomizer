import { faker } from "@faker-js/faker/.";
import { PeopleSchema } from "../../../swapi/people/entity/people.schema";

export class PeopleMock {
  public static generatePeople(): PeopleSchema {
    return {
      nombre: faker.person.fullName(),
      altura: faker.number
        .int({
          min: 160,
          max: 200,
        })
        .toString(),
    };
  }
}
