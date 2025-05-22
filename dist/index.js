"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const providers_1 = require("providers");
const extensions_1 = require("./extensions");
const provider_manager_1 = require("./providers/provider.manager");
// Extend the String prototype with the extensions
for (const key of Object.keys(extensions_1.extensions)) {
    // @ts-ignore
    String.prototype[key] = function (...args) {
        // @ts-ignore
        return extensions_1.extensions[key].apply(this, args);
    };
}
function initialise(provider) {
    provider_manager_1.ProviderManager.setProvider(provider);
}
exports.default = { OpenaiProvider: providers_1.OpenaiProvider, initialise };
//# sourceMappingURL=index.js.map