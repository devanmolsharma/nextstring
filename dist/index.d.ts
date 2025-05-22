import { OpenaiProvider } from "./providers";
import { extensions } from "./extensions";
import { Provider } from "./providers/provider";
type ExtentionsType = typeof extensions;
declare global {
    interface String extends ExtentionsType {
    }
}
declare function initialise(provider: Provider): void;
declare const _default: {
    OpenaiProvider: typeof OpenaiProvider;
    initialise: typeof initialise;
};
export default _default;
