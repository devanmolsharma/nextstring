import { ModelOptions } from "../providers/provider";
import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class Fill extends Extension {
  static functionName = "fill" as const;

  /**
   * Fills template placeholders in the string using AI-inferred values from the provided context.
   * Placeholders are denoted by `{{key}}` syntax.
   * @param context - The context data (string or object) used to fill in the template placeholders.
   * @param options - Optional model options to override the default model.
   * @returns A string with all placeholders replaced by values inferred from the context.
   * @throws Error if the provider is not set or if the filling fails.
   * @example
   * ```ts
   * const template = "Dear {{name}}, your order {{orderId}} has been {{status}}.";
   * const filled = await template.fill({
   *   name: "John",
   *   order: { id: "ORD-123", shipped: true }
   * });
   * console.log(filled);
   * // "Dear John, your order ORD-123 has been shipped."
   * ```
   */
  static async handle(
    context: string | Record<string, any>,
    options?: ModelOptions
  ) {
    const template = this as any as string;
    const provider = ProviderManager.getProvider();

    const placeholders = [...template.matchAll(/\{\{(\w+)\}\}/g)].map(
      (m) => m[1]
    );

    if (placeholders.length === 0) {
      return template;
    }

    const contextStr =
      typeof context === "string" ? context : JSON.stringify(context);

    const answer = await provider.getResponseJson(
      `You are given a template with placeholders and context data.
Fill in each placeholder with the most appropriate value from the context.
Placeholders: ${placeholders.join(", ")}
Context: ${contextStr}
Return a JSON object mapping each placeholder name to its filled value.
{
  "placeholder1": "value1",
  "placeholder2": "value2"
}
Only use the context provided. If a value cannot be determined, use an empty string.`,
      template,
      options?.model
    );

    let result = template;
    for (const key of placeholders) {
      const value =
        answer[key] !== undefined && answer[key] !== null
          ? String(answer[key])
          : "";
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
    }

    return result;
  }
}
