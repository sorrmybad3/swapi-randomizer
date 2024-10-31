import axios from "axios";
import { ApiServiceI } from "./api.service.interface";

export abstract class ApiService<T> implements ApiServiceI<T> {
  constructor(
    private readonly rootUrl: string,
    private readonly endpoint: string,
  ) {}

  async get(id: number): Promise<T> {
    const response = await axios.get<T>(
      `${this.rootUrl}/${this.endpoint}/${id}`,
    );
    return response.data;
  }
}
