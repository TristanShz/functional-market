import { FruitNotFoundError } from "../../errors/fruit-not-found";
import type { FruitRepository } from "../../ports/fruit.repository";
import { Err, Ok, type Result } from "../../shared/result";
import type { GetFruitDetailsQuery } from "./get-fruit-details.query";
import type { GetFruitDetailsResponse } from "./get-fruit-details.response";

export class GetFruitDetailsUseCase {
  constructor(private readonly fruitRepository: FruitRepository) {}

  async execute(
    query: GetFruitDetailsQuery,
  ): Promise<Result<GetFruitDetailsResponse, FruitNotFoundError>> {
    const fruit = await this.fruitRepository.findByName(query.name);

    if (!fruit) {
      return Err.of(new FruitNotFoundError(query.name));
    }

    return Ok.of(fruit.snapshot);
  }
}
