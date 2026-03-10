import { ModelOptions } from "../providers/provider";
import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class Generate extends Extension {
  static functionName = "generate" as const;

  /**
   * Uses the string as a prompt to generate content.
   * @param instructions - Optional additional instructions to guide the generation.
   * @param options - Optional model options to override the default model.
   * @returns A string containing the generated content.
   * @throws Error if the provider is not set or if generation fails.
   * @example
   * ```ts
   * const content = await "a product description for running shoes".generate();
   * console.log(content);
   *
   * const email = await "a professional email declining a meeting".generate(
   *   "Keep it under 50 words",
   *   { model: "gpt-4o" }
   * );
   * ```
   */
  static async handle(instructions?: string, options?: ModelOptions) {
    const prompt = this as any as string;
    const provider = ProviderManager.getProvider();
    const systemPrompt = instructions
      ? `Generate content based on the user's prompt. Follow these instructions: ${instructions}. Return only the generated content.`
      : `Generate content based on the user's prompt. Return only the generated content.`;
    const result = await provider.getResponseString(
      systemPrompt,
      prompt,
      options?.model
    );
    return result;
  }
}
