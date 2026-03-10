import { ModelOptions } from "../providers/provider";
import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class Mask extends Extension {
  static functionName = "mask" as const;

  /**
   * Masks sensitive data in the string based on the provided rules.
   * Partially redacts matched values while preserving their format.
   * @param rules - An array of strings describing what to mask (e.g. "email", "phone", "ssn", "credit card").
   * @param options - Optional model options to override the default model.
   * @returns A string with sensitive data partially masked.
   * @throws Error if the provider is not set or if masking fails.
   * @example
   * ```ts
   * const masked = await "Contact john@example.com or call 555-123-4567".mask(["email", "phone"]);
   * console.log(masked); // "Contact j***@e******.com or call ***-***-4567"
   *
   * const masked2 = await "SSN: 123-45-6789, Card: 4111-1111-1111-1111".mask(
   *   ["ssn", "credit card"],
   *   { model: "gpt-4o" }
   * );
   * console.log(masked2); // "SSN: ***-**-6789, Card: ****-****-****-1111"
   * ```
   */
  static async handle(rules: string[], options?: ModelOptions) {
    const text = this as any as string;
    const provider = ProviderManager.getProvider();

    const ruleList = rules.map((r) => `- ${r}`).join("\n");

    const answer = await provider.getResponseJson(
      `You are a data masking tool. Given the user's text, identify and partially mask the following types of sensitive data:
${ruleList}

Rules for masking:
- Replace characters with * while preserving the format/structure
- Keep the last few characters visible for identification (e.g. last 4 digits of phone, domain hint for email)
- For emails: mask most of the local part and domain but keep first char, @ symbol, and TLD visible (e.g. j***@e******.com)
- For phone numbers: mask all but the last 4 digits, keep separators (e.g. ***-***-4567)
- For SSNs: mask all but last 4 digits (e.g. ***-**-6789)
- For credit cards: mask all but last 4 digits (e.g. ****-****-****-1111)
- For names: replace with [NAME]
- For addresses: replace with [ADDRESS]
- For other types: use reasonable partial masking

Return the result as JSON:
{
  "masked": "the fully masked text"
}
Only return the JSON, nothing else.`,
      text,
      options?.model
    );

    if (typeof answer !== "object" || answer === null || !("masked" in answer)) {
      throw new Error("Invalid response format");
    }

    return answer.masked as string;
  }
}
