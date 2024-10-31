export interface ApiServiceI<T> {
  get(id: number): Promise<T>;
}
