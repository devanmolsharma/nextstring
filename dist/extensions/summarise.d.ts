import { Extension } from "./extension.js";
export declare class Summarise extends Extension {
    static functionName: "summarise";
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
    static handle(num_words: number): Promise<String>;
}
