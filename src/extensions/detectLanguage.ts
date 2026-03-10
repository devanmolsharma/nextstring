import { ModelOptions } from "../providers/provider";
import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class DetectLanguage extends Extension {
  static functionName = "detectLanguage" as const;

  /**
   * Detects the language of the given text.
   * @param options - Optional model options to override the default model.
   * @returns A string containing the detected language name.
   * @throws Error if the provider is not set or if detection fails.
   * @example
   * ```ts
   * const lang = await "Bonjour le monde".detectLanguage();
   * console.log(lang); // "French"
   *
   * const lang2 = await "こんにちは".detectLanguage({ model: "gpt-4o" });
   * console.log(lang2); // "Japanese"
   * ```
   */
  static async handle(options?: ModelOptions) {
    const text = this as any as string;
    const provider = ProviderManager.getProvider();
    const answer = await provider.getResponseJson(
      `Detect the language of the text the user provides.
Return the answer in JSON format:
{
  "language": "language name in English"
}
Only return the JSON, nothing else.`,
      text,
      options?.model
    );

    if (typeof answer !== "object" || answer === null || !("language" in answer)) {
      throw new Error("Invalid response format");
    }

    return answer.language as string;
  }
}
