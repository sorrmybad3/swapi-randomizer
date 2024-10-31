import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ApiService } from "../../api/api.service";
import { PeopleSchema } from "../entity/people.schema";
import { Config, EnvEnum } from "../../../config/config";

@injectable()
export class PeopleApiService extends ApiService<PeopleSchema> {
  constructor(@inject(Config) readonly config: Config) {
    super(config.get(EnvEnum.SWAPI_ROOT_URL), config.get(EnvEnum.SWAPI_PEOPLE_ENDPOINT));
  }
}
