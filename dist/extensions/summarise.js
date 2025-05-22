import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";
export class Summarise extends Extension {
    /**
     * Dummy implementation of the handle method.
     * @param data - The data to be handled.
     * @returns A string indicating the result of the handling.
     */
    static async handle(num_words) {
        const data = this;
        const provider = ProviderManager.getProvider();
        const summary = await provider.getResponseString(`Summarise the following text in ${num_words} words`, data);
        return summary;
    }
}
Summarise.functionName = "summarise";
//# sourceMappingURL=summarise.js.map