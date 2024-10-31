import { Expose } from "class-transformer";

export class PeopleSchema {
  @Expose({ name: "name" })
  nombre: string;

  @Expose({ name: "height" })
  altura: string;

  constructor(name: string, height: string) {
    this.nombre = name;
    this.altura = height;
  }
}
