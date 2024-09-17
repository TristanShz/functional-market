import type { IdProvider } from "../ports/id-provider";

export class RealIdProvider implements IdProvider {
  provide() {
    return Math.random().toString(36).substring(7);
  }
}
