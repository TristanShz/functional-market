import { expect } from "bun:test";
import type { Fruit } from "../../domain/fruit.entity";
import { InMemoryFruitRepository } from "../../infrastructure/fruit.inmemory.repository";
import type { AddFruitCommand } from "../add-fruit/add-fruit.command";
import { AddFruitUseCase } from "../add-fruit/add-fruit.usecase";
import { StubIdProvider } from "../../infrastructure/stub-id-provider";
import { AddToStockUseCase } from "../add-to-stock/add-to-stock.usecase";
import type { AddToStockCommand } from "../add-to-stock/add-to-stock.command";
import { SellFruitUseCase } from "../sell-fruit/sell-fruit.usecase";
import type { SellFruitCommand } from "../sell-fruit/sell-fruit.command";
import { DeleteFruitUseCase } from "../delete-fruit/delete-fruit.usecase";
import type { DeleteFruitCommand } from "../delete-fruit/delete-fruit.command";
import { GetFruitDetailsUseCase } from "../get-fruit-details/get-fruit-details.usecase";
import type { GetFruitDetailsQuery } from "../get-fruit-details/get-fruit-details.query";
import type { GetFruitDetailsResponse } from "../get-fruit-details/get-fruit-details.response";

export const createFruitFixture = () => {
  const idProvider = new StubIdProvider();
  const fruitRepository = new InMemoryFruitRepository();

  const addFruitUseCase = new AddFruitUseCase(fruitRepository, idProvider);
  const addToStockUseCase = new AddToStockUseCase(fruitRepository);
  const sellFruitUseCase = new SellFruitUseCase(fruitRepository);
  const deleteFruitUseCase = new DeleteFruitUseCase(fruitRepository);
  const getFruitDetailsUseCase = new GetFruitDetailsUseCase(fruitRepository);

  let thrownError: any;
  let fruitDetails: GetFruitDetailsResponse | undefined;
  return {
    givenPredefinedId: (id: string) => {
      idProvider.id = id;
    },

    givenFruitInStock: (fruit: Fruit) => {
      fruitRepository.fruits.push(fruit);
    },

    whenAddingAFruit: async (command: AddFruitCommand) => {
      const result = await addFruitUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenAddingStock: async (command: AddToStockCommand) => {
      const result = await addToStockUseCase.execute(command);
      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenSellingFruit: async (command: SellFruitCommand) => {
      const result = await sellFruitUseCase.execute(command);
      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenDeletingFruit: async (command: DeleteFruitCommand) => {
      const result = await deleteFruitUseCase.execute(command);
      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenGettingFruitDetails: async (query: GetFruitDetailsQuery) => {
      const result = await getFruitDetailsUseCase.execute(query);
      if (result.isErr()) {
        thrownError = result.error;
        return;
      }
      fruitDetails = result.value;
    },

    thenStockShouldContain: (expected: Fruit) => {
      const fruit = fruitRepository.fruits.find((f) => f.id === expected.id);

      expect(fruit).toEqual(expected);
    },
    thenStockShouldNotContain: (expected: Fruit) => {
      const fruit = fruitRepository.fruits.find((f) => f.id === expected.id);
      expect(fruit).toBeUndefined();
    },
    thenErrorShouldBe: (expected: new (...args: any[]) => any) => {
      expect(thrownError).toBeInstanceOf(expected);
    },
    thenDisplayedDetailsAre: (expected: GetFruitDetailsResponse) => {
      expect(fruitDetails).toEqual(expected);
    },
  };
};

export type FruitFixture = ReturnType<typeof createFruitFixture>;
