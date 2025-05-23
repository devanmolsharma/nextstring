import { extensions } from "./extensions/index.js";
import { Provider } from "./providers/provider.js";
import { ProviderManager } from "./providers/provider.manager.js";

type ExtentionsType = typeof extensions;

declare global {
  interface String extends ExtentionsType {}
}

// Extend the String prototype with the extensions
for (const key of Object.keys(extensions)) {
  // @ts-ignore
  String.prototype[key] = function (...args: any[]) {
    // @ts-ignore
    return extensions[key as keyof typeof extensions].apply(this, args);
  };
}

export function initialise(provider: Provider) {
  ProviderManager.setProvider(provider);
}
