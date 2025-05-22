"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderManager = void 0;
class ProviderManager {
    static setProvider(provider) {
        this.currentProvider = provider;
    }
    static getProvider() {
        if (!this.currentProvider) {
            throw new Error("No provider set. Please set a provider first.");
        }
        return this.currentProvider;
    }
}
exports.ProviderManager = ProviderManager;
ProviderManager.currentProvider = null;
//# sourceMappingURL=provider.manager.js.map