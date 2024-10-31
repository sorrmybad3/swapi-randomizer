import "reflect-metadata";
import { container } from "tsyringe";
import { Config } from "./config";

const config = container.resolve(Config);
export default config;
