import { expect, beforeEach, test, describe } from "bun:test";
import {
  createFruitFixture,
  type FruitFixture,
} from "../_fixtures/fruit.fixture";
import { Fruit } from "../../domain/fruit.entity";

describe("Feature: Add to stock", () => {
  let fixture: FruitFixture;

  beforeEach(() => {
    fixture = createFruitFixture();
  });

  describe("Scenario: Add stock for a fruit", () => {
    test("The fruit seller can add stock to an existing fruit", async () => {
      const banana = new Fruit({ id: "id-1", name: "Banana", stock: 0 });

      fixture.givenFruitInStock(banana);

      await fixture.whenAddingStock({
        name: "Banana",
        quantity: 10,
      });

      fixture.thenStockShouldContain(
        new Fruit({ id: "id-1", name: "Banana", stock: 10 }),
      );
    });
  });
});
