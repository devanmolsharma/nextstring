import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class Summarise extends Extension {
  static functionName = "summarise" as const;

  /**
   * Dummy implementation of the handle method.
   * @param data - The data to be handled.
   * @returns A string indicating the result of the handling.
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
