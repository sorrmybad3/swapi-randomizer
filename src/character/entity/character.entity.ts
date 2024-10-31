export class CharacterSchema {
  id: string;
  nombre: string;
  altura: number;

  constructor(id: string, nombre: string, altura: number) {
    this.id = id;
    this.nombre = nombre;
    this.altura = altura;
  }
}