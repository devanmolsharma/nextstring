export class ProviderManager {
    static currentProvider = null;
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
//# sourceMappingURL=provider.manager.js.map