import { FruitNotFoundError } from "../../errors/fruit-not-found";
import type { FruitRepository } from "../../ports/fruit.repository";
import { Err, Ok } from "../../shared/result";
import type { DeleteFruitCommand } from "./delete-fruit.command";

export class DeleteFruitUseCase {
  constructor(private readonly fruitRepository: FruitRepository) {}

  async execute(command: DeleteFruitCommand) {
    const fruit = await this.fruitRepository.findByName(command.name);

    if (!fruit) {
      return Err.of(new FruitNotFoundError(command.name));
    }

    await this.fruitRepository.delete(fruit.id);

    return Ok.of(undefined);
  }
}
