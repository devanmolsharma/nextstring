import { extensions } from "./extensions/index";
import { Provider } from "./providers/provider";
import { ProviderManager } from "./providers/provider.manager";

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

export function initialise(
  provider: Provider,
  override: boolean = false
): void {
  if (!override) {
    try {
      const currentProvider = ProviderManager.getProvider();
      console.warn(
        `Provider is already set to ${currentProvider.constructor.name}. Use 'override' option to replace the current provider.`
      );
      return;
    } catch (e) {
      // No current provider, continue with initialization
    }
  }
  ProviderManager.setProvider(provider);
}
