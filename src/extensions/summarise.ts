import { ProviderManager } from "../providers/provider.manager.js";
import { Extension } from "./extension.js";

export class Summarise extends Extension {
  static functionName = "summarise" as const;

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
  static async handle(num_words: number) {
    const data = this as any as string;
    const provider = ProviderManager.getProvider();
    const summary = await provider.getResponseString(
      `Summarise the following text in ${num_words} words`,
      data
    );
    return summary;
  }
}
