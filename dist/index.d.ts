import { OpenaiProvider } from "providers";
import { extensions } from "./extensions";
import { Provider } from "./providers/provider";
type ExtentionsType = typeof extensions;
declare global {
    interface String extends ExtentionsType {
    }
}
export declare function initialise(provider: Provider): void;
declare const _default: {
    initialise: typeof initialise;
    OpenaiProvider: typeof OpenaiProvider;
};
export default _default;
//# sourceMappingURL=index.d.ts.map