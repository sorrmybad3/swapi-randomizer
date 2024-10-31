import { ApiService } from "../../api/api.service";

export class PeopleApiService extends ApiService {
  constructor() {
    super("https://swapi.dev/api", "people");
  }
}
