import { expect, beforeEach, test, describe } from "bun:test";
import {
  createFruitFixture,
  type FruitFixture,
} from "../_fixtures/fruit.fixture";
import { Fruit, StockLimitReachedError } from "../../domain/fruit.entity";

describe("Feature: Get Fruit Details", () => {
  let fixture: FruitFixture;

  beforeEach(() => {
    fixture = createFruitFixture();
  });

  describe("Scenario: Get details of a fruit", () => {
    test("The fruit seller can get the details of a fruit", async () => {
      const banana = new Fruit({ id: "id-1", name: "Banana", stock: 12 });
      fixture.givenFruitInStock(banana);
      await fixture.whenGettingFruitDetails({
        name: "Banana",
      });

      fixture.thenDisplayedDetailsAre({
        id: "id-1",
        name: "Banana",
        stock: 12,
      });
    });
  });
});
