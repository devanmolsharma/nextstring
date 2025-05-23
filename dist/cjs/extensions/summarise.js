"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summarise = void 0;
const provider_manager_1 = require("../providers/provider.manager");
const extension_1 = require("./extension");
class Summarise extends extension_1.Extension {
    /**
     * Summarises the given text to a specified number of words.
     * @param num_words - The number of words to summarise the text to.
     * @returns A string containing the summarised text.
     * @throws Error if the provider is not set or if the summarisation fails.
     * @example
     * ```ts
     * const text = "This is a long text that needs to be summarised.";
     * const summary = await text.summarise(10);
     * console.log(summary); // "This is a long text that needs to be summarised."
     * ```
     */
    static async handle(num_words) {
        const data = this;
        const provider = provider_manager_1.ProviderManager.getProvider();
        const summary = await provider.getResponseString(`Summarise the following text in ${num_words} words`, data);
        return summary;
    }
}
exports.Summarise = Summarise;
Summarise.functionName = "summarise";
//# sourceMappingURL=summarise.js.map