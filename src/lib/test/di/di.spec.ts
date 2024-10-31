import "reflect-metadata";
import { container } from "tsyringe";
import { Config } from "../../../config/config";

describe("Class singleton test", () => {
  it("should return the same instance of a class", () => {
    const config1 = container.resolve(Config);
    const config2 = container.resolve(Config);
    expect(config2).toBe(config1);
  });
});
