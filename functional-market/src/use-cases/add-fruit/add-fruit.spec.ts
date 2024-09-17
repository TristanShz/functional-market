import { beforeEach, test, describe } from "bun:test";
import {
  createFruitFixture,
  type FruitFixture,
} from "../_fixtures/fruit.fixture";
import { Fruit } from "../../domain/fruit.entity";
import { FruitNameAlreadyExistsError } from "./add-fruit.usecase";

describe("Feature: Add Fruit", () => {
  let fixture: FruitFixture;

  beforeEach(() => {
    fixture = createFruitFixture();
  });

  describe("Scenario: Add a fruit", () => {
    test("The fruit seller can add a new fruit to the stock", async () => {
      fixture.givenPredefinedId("id-1");

      await fixture.whenAddingAFruit({
        name: "Banana",
      });

      fixture.thenStockShouldContain(
        new Fruit({ id: "id-1", name: "Banana", stock: 0 }),
      );
    });

    test("The fruit seller can add a new fruit to the stock with a predefined stock", async () => {
      fixture.givenPredefinedId("id-1");
      await fixture.whenAddingAFruit({
        name: "Banana",
        stock: 10,
      });
      fixture.thenStockShouldContain(
        new Fruit({ id: "id-1", name: "Banana", stock: 10 }),
      );
    });

    test("The fruit seller cannot add a fruit with an existing name", async () => {
      const banana = new Fruit({ id: "id-1", name: "Banana", stock: 0 });
      fixture.givenFruitInStock(banana);
      await fixture.whenAddingAFruit({
        name: "Banana",
      });
      fixture.thenErrorShouldBe(FruitNameAlreadyExistsError);
    });
  });
});
