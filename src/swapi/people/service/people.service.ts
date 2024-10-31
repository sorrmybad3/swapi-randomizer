import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { PeopleSchema } from "../entity/people.schema";
import { PeopleServiceI } from "./people.service.interface";
import { PeopleApiService } from "../api/people.api.service";
import { MapperUtils } from "../../../lib/mapper/mapper.utils";

@injectable()
export class PeopleService implements PeopleServiceI {
  constructor(
    @inject(PeopleApiService)
    private readonly peopleApiService: PeopleApiService,
  ) {}

  findPeople(id: number): Promise<PeopleSchema> {
    let person = this.peopleApiService.get(id);
    person = MapperUtils.map(PeopleSchema, person);
    return person;
  }
}
