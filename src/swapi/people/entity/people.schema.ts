import { Expose } from "class-transformer";

export class PeopleSchema {
  @Expose({ name: "name" })
  name: string;

  @Expose({ name: "height" })
  height: string;

  constructor(name: string, height: string) {
    this.name = name;
    this.height = height;
  }
}
