import { extensions } from "./extensions/index.js";
import { ProviderManager } from "./providers/provider.manager.js";
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
//# sourceMappingURL=main.js.map