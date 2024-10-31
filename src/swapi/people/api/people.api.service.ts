import "reflect-metadata";
import { injectable } from "tsyringe";
import { ApiService } from "../../api/api.service";
import { PeopleSchema } from "../entity/people.schema";

@injectable()
export class PeopleApiService extends ApiService<PeopleSchema> {
  constructor() {
    super("https://swapi.dev/api", "people");
  }
}
