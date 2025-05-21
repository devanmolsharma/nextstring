"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialise = initialise;
const extensions_1 = require("./extensions");
const provider_manager_1 = require("./providers/provider.manager");
// Extend the String prototype with the extensions
for (const key of Object.keys(extensions_1.extensions)) {
    // @ts-ignore
    String.prototype[key] = function (...args) {
        return extensions_1.extensions[key].apply(this);
    };
}
function initialise(provider) {
    provider_manager_1.ProviderManager.setProvider(provider);
}
