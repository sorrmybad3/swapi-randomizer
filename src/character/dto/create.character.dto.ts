import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateCharacterDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsInt()
  @Max(200)
  @Min(160)
  @IsOptional()
  altura?: number;

  constructor(nombre: string, altura: number) {
    this.nombre = nombre;
    this.altura = altura;
  }
}
