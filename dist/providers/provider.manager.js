"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderManager = void 0;
var ProviderManager = /** @class */ (function () {
    function ProviderManager() {
    }
    ProviderManager.setProvider = function (provider) {
        this.currentProvider = provider;
    };
    ProviderManager.getProvider = function () {
        if (!this.currentProvider) {
            throw new Error("No provider set. Please set a provider first.");
        }
        return this.currentProvider;
    };
    ProviderManager.currentProvider = null;
    return ProviderManager;
}());
exports.ProviderManager = ProviderManager;
//# sourceMappingURL=provider.manager.js.map