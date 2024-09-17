export class FruitNotFoundError extends Error {
  constructor(idOrName: string) {
    super(`Fruit ${idOrName} not found`);
  }
}
