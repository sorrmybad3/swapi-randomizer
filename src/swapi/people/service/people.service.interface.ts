import { PeopleSchema } from "../entity/people.schema";

export interface PeopleServiceI {
  findPeople(id: number): Promise<PeopleSchema>;
}
