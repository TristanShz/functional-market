import { FruitNotFoundError } from "../../errors/fruit-not-found";
import type { FruitRepository } from "../../ports/fruit.repository";
import { Err, Ok } from "../../shared/result";
import type { SellFruitCommand } from "./sell-fruit.command";

export class SellFruitUseCase {
  constructor(private readonly fruitRepository: FruitRepository) {}

  async execute(command: SellFruitCommand) {
    const fruit = await this.fruitRepository.findByName(command.name);

    if (!fruit) {
      return Err.of(new FruitNotFoundError(command.name));
    }

    const result = fruit.removeStock(command.quantity);

    if (result.isErr()) {
      return result;
    }

    await this.fruitRepository.save(fruit);

    return Ok.of(undefined);
  }
}
