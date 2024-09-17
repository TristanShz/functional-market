import { Fruit } from "../../domain/fruit.entity";
import type { FruitRepository } from "../../ports/fruit.repository";
import type { IdProvider } from "../../ports/id-provider";
import { Err, Ok, type Result } from "../../shared/result";
import type { AddFruitCommand } from "./add-fruit.command";

export class FruitNameAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Fruit with name ${name} already exists`);
  }
}

export class AddFruitUseCase {
  constructor(
    private readonly fruitRepository: FruitRepository,
    private readonly idProvider: IdProvider,
  ) {}

  async execute(
    command: AddFruitCommand,
  ): Promise<Result<void, FruitNameAlreadyExistsError>> {
    const existingFruit = await this.fruitRepository.findByName(command.name);

    if (existingFruit) {
      return Err.of(new FruitNameAlreadyExistsError(command.name));
    }

    const fruit = new Fruit({
      id: this.idProvider.provide(),
      name: command.name,
      stock: command.stock ?? 0,
    });

    await this.fruitRepository.save(fruit);

    return Ok.of(undefined);
  }
}
