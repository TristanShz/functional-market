import type { Fruit } from "../domain/fruit.entity";
import type { FruitRepository } from "../ports/fruit.repository";

export class InMemoryFruitRepository implements FruitRepository {
  fruits: Fruit[] = [];

  async save(fruit: Fruit) {
    const index = this.fruits.findIndex((f) => f.id === fruit.id);

    if (index >= 0) {
      this.fruits[index] = fruit;
      return;
    }

    this.fruits.push(fruit);
  }

  async findById(id: string) {
    return this.fruits.find((fruit) => fruit.id === id);
  }

  async findByName(name: string) {
    return this.fruits.find((fruit) => fruit.name === name);
  }

  async delete(id: string) {
    this.fruits = this.fruits.filter((fruit) => fruit.id !== id);
  }
}
