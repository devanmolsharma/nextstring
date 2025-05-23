import { Provider } from "./provider.js";

export class ProviderManager {
  private static currentProvider: Provider | null = null;

  static setProvider(provider: Provider) {
    this.currentProvider = provider;
  }
  static getProvider(): Provider {
    if (!this.currentProvider) {
      throw new Error("No provider set. Please set a provider first.");
    }
    return this.currentProvider;
  }
}
