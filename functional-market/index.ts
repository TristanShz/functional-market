import { InMemoryFruitRepository } from "./src/infrastructure/fruit.inmemory.repository";
import { RealIdProvider } from "./src/infrastructure/real-id-provider";
import { AddFruitUseCase } from "./src/use-cases/add-fruit/add-fruit.usecase";
import { AddToStockUseCase } from "./src/use-cases/add-to-stock/add-to-stock.usecase";
import { DeleteFruitUseCase } from "./src/use-cases/delete-fruit/delete-fruit.usecase";
import { GetFruitDetailsUseCase } from "./src/use-cases/get-fruit-details/get-fruit-details.usecase";
import { SellFruitUseCase } from "./src/use-cases/sell-fruit/sell-fruit.usecase";

const idProvider = new RealIdProvider();
const fruitRepository = new InMemoryFruitRepository();

const addFruitUseCase = new AddFruitUseCase(fruitRepository, idProvider);
const addToStockUseCase = new AddToStockUseCase(fruitRepository);
const sellFruitUseCase = new SellFruitUseCase(fruitRepository);
const deleteFruitUseCase = new DeleteFruitUseCase(fruitRepository);
const getFruitDetailsUseCase = new GetFruitDetailsUseCase(fruitRepository);

async function init() {
  const pommeResult = await addFruitUseCase.execute({
    name: "Pomme",
    stock: 10,
  });

  if (pommeResult.isOk()) {
    console.log("Pomme created with stock of 10");
  } else {
    console.error("Error creating Pomme:", pommeResult.error);
    process.exit(1);
  }

  const poireResult = await addFruitUseCase.execute({
    name: "Poire",
    stock: 5,
  });

  if (poireResult.isOk()) {
    console.log("Poire created with stock of 5");
  } else {
    console.error("Error creating Poire:", poireResult.error);
    process.exit(1);
  }

  const ananasResult = await addFruitUseCase.execute({
    name: "Ananas",
    stock: 8,
  });

  if (ananasResult.isOk()) {
    console.log("Ananas created with stock of 8");
  } else {
    console.error("Error creating Ananas:", ananasResult.error);
    process.exit(1);
  }

  const pommeAddResult = await addToStockUseCase.execute({
    name: "Pomme",
    quantity: 10,
  });

  if (pommeAddResult.isOk()) {
    console.log("Pomme stock increased by 10");
  } else {
    console.error("Error adding stock to Pomme:", pommeAddResult.error);
    process.exit(1);
  }

  const poireAddResult = await addToStockUseCase.execute({
    name: "Poire",
    quantity: 5,
  });

  if (poireAddResult.isOk()) {
    console.log("Poire stock increased by 5");
  } else {
    console.error("Error adding stock to Poire:", poireAddResult.error);
    process.exit(1);
  }

  const ananasAddResult = await addToStockUseCase.execute({
    name: "Ananas",
    quantity: 8,
  });

  if (ananasAddResult.isOk()) {
    console.log("Ananas stock increased by 8");
  } else {
    console.error("Error adding stock to Ananas:", ananasAddResult.error);
    process.exit(1);
  }

  const detailsResult = await getFruitDetailsUseCase.execute({
    name: "Ananas",
  });

  if (detailsResult.isOk()) {
    console.log("Ananas details:", detailsResult.value);
  } else {
    console.error("Error getting Ananas details:", detailsResult.error);
    process.exit(1);
  }

  const sellResult = await sellFruitUseCase.execute({
    name: "Ananas",
    quantity: 2,
  });

  if (sellResult.isOk()) {
    console.log("2 Ananas sold");
  } else {
    console.error("Error selling Ananas:", sellResult.error);
    process.exit(1);
  }

  const detailsAfterSaleResult = await getFruitDetailsUseCase.execute({
    name: "Ananas",
  });

  if (detailsAfterSaleResult.isOk()) {
    console.log("Ananas details after sale:", detailsAfterSaleResult.value);
  } else {
    console.error(
      "Error getting Ananas details:",
      detailsAfterSaleResult.error,
    );
    process.exit(1);
  }

  const deleteResult = await deleteFruitUseCase.execute({ name: "Ananas" });

  if (deleteResult.isOk()) {
    console.log("Ananas deleted");
  } else {
    console.error("Error deleting Ananas:", deleteResult.error);
    process.exit(1);
  }

  const detailsResultAfterDelete = await getFruitDetailsUseCase.execute({
    name: "Ananas",
  });

  if (detailsResultAfterDelete.isErr()) {
    console.log(
      "Ananas details after delete:",
      detailsResultAfterDelete.error.message,
    );
  } else {
    console.error("Ananas was not deleted");
    process.exit(1);
  }
}

void init();

