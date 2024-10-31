// config/index.ts
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Config } from './config';

// Resolve and instantiate Config to ensure it's initialized and validated on import
const config = container.resolve(Config);
export default config;
