import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class Rewrite extends Extension {
  static functionName = "rewrite" as const;

  /**
   * Rewrites the given data based on the provided instructions.
   * @param instructions - The instructions for rewriting the data.
   * @returns A string containing the rewritten data.
   * @throws Error if the provider is not set or if the rewriting fails.
   * @example
   * ```ts
   * const data = "This is some original text.";
   * const instructions = "Rewrite this to be more formal.";
   * const rewritten = await data.rewrite(instructions);
   * console.log(rewritten); // "This is some original text rewritten formally."
   * ```
   */
  static async handle(instructions: string) {
    const data = this as any as string;
    const provider = ProviderManager.getProvider();
    const rewrittenData = await provider.getResponseString(
      `Rewrite the following data based on these instructions: ${instructions}. Only return the rewritten data.`,
      data
    );
    return rewrittenData;
  }
}
