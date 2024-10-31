export interface ApiServiceI {
  get<T>(id: number): Promise<T>;
}
