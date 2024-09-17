import { Err, Ok, type Result } from "../shared/result";

export interface FruitProps {
  id: string;
  name: string;
  stock: number;
}

export class Fruit {
  constructor(private props: FruitProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get stock() {
    return this.props.stock;
  }

  get snapshot() {
    return Object.freeze({ ...this.props });
  }

  addStock(quantity: number) {
    this.props.stock += quantity;
  }

  removeStock(quantity: number): Result<void, StockLimitReachedError> {
    if (this.props.stock - quantity < 0) {
      return Err.of(new StockLimitReachedError(this.name, this.stock));
    }
    this.props.stock -= quantity;

    return Ok.of(undefined);
  }

  equals(fruit: Fruit) {
    return this.id === fruit.id;
  }
}

export class StockLimitReachedError extends Error {
  constructor(name: string, availableStock: number) {
    super(
      `Stock limit reached for fruit ${name}, available stock: ${availableStock}`,
    );
  }
}
