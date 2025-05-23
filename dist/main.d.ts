import { extensions } from "./extensions/index.js";
import { Provider } from "./providers/provider.js";
type ExtentionsType = typeof extensions;
declare global {
    interface String extends ExtentionsType {
    }
}
export declare function initialise(provider: Provider): void;
export {};
