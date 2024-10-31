import {
  IsString,
  IsInt,
  Min,
  ValidationError,
  MinLength,
} from "class-validator";
import { MapperUtils } from "./mapper.utils";
import { Expose } from "class-transformer";

class TestDto {
  @Expose()
  @MinLength(3)
  @IsString()
  name: string;

  @Expose()
  @IsInt()
  @Min(1)
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

describe("MapperUtils Unit test", () => {
  it("maps correclty when validation and schema are expected.", async () => {
    const data = { name: "John", age: 25 };

    const instance = await MapperUtils.map(TestDto, data);

    expect(instance).toBeInstanceOf(TestDto);
    expect(instance.name).toBe("John");
    expect(instance.age).toBe(25);
  });

  it("shouldd throw if validation fails.", async () => {
    const data = { name: "John", age: -5 };

    try {
      await MapperUtils.map(TestDto, data);
      fail("Should have thrown an error");
    } catch (error) {
      expect(error).toHaveLength(1);
      const errorArray = error as unknown[];
      errorArray.forEach((element) => {
        expect(element).toBeInstanceOf(ValidationError);
      });
    }
  });

  it("should sanitize unexpected fields.", async () => {
    const data = { name: "John", age: 25, extra: "unexpected" };

    const instance = await MapperUtils.map(TestDto, data);

    expect(instance).toBeInstanceOf(TestDto);
    expect((instance as typeof data).extra).toBeUndefined();
  });

  it("should throw an error with multiple messages if multiple errors are found", async () => {
    const data = { name: "", age: 0 };

    try {
      await MapperUtils.map(TestDto, data);
      fail("Should have thrown an error");
    } catch (error) {
      expect(error).toHaveLength(2);
      const errorArray = error as unknown[];
      errorArray.forEach((element) => {
        expect(element).toBeInstanceOf(ValidationError);
      });
    }
  });
});
