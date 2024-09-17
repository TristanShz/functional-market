import { expect, beforeEach, test, describe } from "bun:test";
import {
  createFruitFixture,
  type FruitFixture,
} from "../_fixtures/fruit.fixture";
import { Fruit, StockLimitReachedError } from "../../domain/fruit.entity";

describe("Feature: Sell Fruit", () => {
  let fixture: FruitFixture;

  beforeEach(() => {
    fixture = createFruitFixture();
  });

  describe("Scenario: Sell fruit in stock", () => {
    test("The fruit seller can sell a fruit that is in stock", async () => {
      const banana = new Fruit({ id: "id-1", name: "Banana", stock: 12 });

      fixture.givenFruitInStock(banana);

      await fixture.whenSellingFruit({
        name: "Banana",
        quantity: 10,
      });

      fixture.thenStockShouldContain(
        new Fruit({ id: "id-1", name: "Banana", stock: 2 }),
      );
    });

    test("The fruit seller cannot sell more than the available stock", async () => {
      const banana = new Fruit({ id: "id-1", name: "Banana", stock: 12 });

      fixture.givenFruitInStock(banana);

      await fixture.whenSellingFruit({
        name: "Banana",
        quantity: 15,
      });

      fixture.thenErrorShouldBe(StockLimitReachedError);
    });
  });
});
