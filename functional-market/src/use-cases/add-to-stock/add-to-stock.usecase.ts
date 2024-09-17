import { FruitNotFoundError } from "../../errors/fruit-not-found";
import type { FruitRepository } from "../../ports/fruit.repository";
import { Err, Ok } from "../../shared/result";
import type { AddToStockCommand } from "./add-to-stock.command";

export class AddToStockUseCase {
  constructor(private readonly fruitRepository: FruitRepository) {}

  async execute(command: AddToStockCommand) {
    const fruit = await this.fruitRepository.findByName(command.name);

    if (!fruit) {
      return Err.of(new FruitNotFoundError(command.name));
    }

    fruit.addStock(command.quantity);

    await this.fruitRepository.save(fruit);

    return Ok.of(undefined);
  }
}
