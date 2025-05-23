import { Provider } from "./provider";
export declare class ProviderManager {
    private static currentProvider;
    static setProvider(provider: Provider): void;
    static getProvider(): Provider;
}
