import axios from "axios";
import { ApiServiceI } from "./api.service.interface";

export abstract class ApiService implements ApiServiceI {
  constructor(
    private readonly rootUrl: string,
    private readonly endpoint: string,
  ) {}

  async get<T>(id: number): Promise<T> {
    const response = await axios.get<T>(
      `${this.rootUrl}/${this.endpoint}/${id}`,
    );
    return response.data;
  }
}
