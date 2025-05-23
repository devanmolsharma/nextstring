import { Provider } from "./provider.js";
export declare class ProviderManager {
    private static currentProvider;
    static setProvider(provider: Provider): void;
    static getProvider(): Provider;
}
