import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export class MapperUtils {
  public static async map<T extends object>(
    cls: ClassConstructor<T>,
    data: unknown,
  ): Promise<T> {
    const instance = plainToInstance(cls, data, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(instance);
    if (errors.length > 0) {
      this.handleValidationErrors(errors);
    }
    return instance;
  }

  public static handleValidationErrors(errors: ValidationError[]) {
    const messages = errors.map((error: ValidationError) => {
      return error.constraints;
    });
    throw new Error(messages.join(", "));
  }
}
