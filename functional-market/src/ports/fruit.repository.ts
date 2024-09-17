import type { Fruit } from "../domain/fruit.entity";

export interface FruitRepository {
  save(fruit: Fruit): Promise<void>;
  findById(id: string): Promise<Fruit | undefined>;
  findByName(name: string): Promise<Fruit | undefined>;
  delete(id: string): Promise<void>;
}
