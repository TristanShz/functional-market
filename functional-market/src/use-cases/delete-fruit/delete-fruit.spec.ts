import { expect, beforeEach, test, describe } from "bun:test";
import {
  createFruitFixture,
  type FruitFixture,
} from "../_fixtures/fruit.fixture";
import { Fruit, StockLimitReachedError } from "../../domain/fruit.entity";

describe("Feature: Delete Fruit", () => {
  let fixture: FruitFixture;

  beforeEach(() => {
    fixture = createFruitFixture();
  });

  describe("Scenario: Delete a fruit that is in stock", () => {
    test("The fruit seller can delete a fruit that is in stock", async () => {
      const banana = new Fruit({ id: "id-1", name: "Banana", stock: 12 });

      fixture.givenFruitInStock(banana);

      await fixture.whenDeletingFruit({
        name: "Banana",
      });

      fixture.thenStockShouldNotContain(banana);
    });
  });
});
