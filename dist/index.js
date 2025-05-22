import { extensions } from "./extensions";
import { ProviderManager } from "./providers/provider.manager";
// Extend the String prototype with the extensions
for (const key of Object.keys(extensions)) {
    // @ts-ignore
    String.prototype[key] = function (...args) {
        // @ts-ignore
        return extensions[key].apply(this, args);
    };
}
export function initialise(provider) {
    ProviderManager.setProvider(provider);
}
export * from "./providers";
//# sourceMappingURL=index.js.map