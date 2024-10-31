import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

export class MapperUtils {
  public static async map<T extends object>(
    cls: ClassConstructor<T>,
    data: unknown,
  ): Promise<T> {
    const instance = plainToInstance(cls, data, {
      excludeExtraneousValues: true,
    });
    await validateOrReject(instance);
    return instance;
  }

  public static handleValidationErrors(errors: ValidationError[]) {
    const messages = errors.map((error: ValidationError) => {
      return error.constraints;
    });
    return messages
  }
}
