import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class ClassifyText extends Extension {
  static functionName = "classifyText" as const;

  /**
   * Classifies the given text into predefined categories based on descriptions.
   * @param categories - An array of objects containing `name` and `description` of the categories.
   * @returns The name of the category the text belongs to.
   * @throws Error if the provider is not set or if classification fails.
   * @example
   * ```ts
   * const text = "This is a message about a technical issue.";
   * const categories = [
   *   { name: "support", description: "Messages related to customer support" },
   *   { name: "sales", description: "Messages related to sales inquiries" }
   * ];
   * const result = await text.classifyText(categories);
   * console.log(result); // "support"
   * ```
   */
  static async handle<T extends string>(
    categories: { name: T; description: string }[]
  ): Promise<T> {
    const text = this as any as string;
    const provider = ProviderManager.getProvider();
    const query = categories
      .map(
        (category) =>
          `Category: ${category.name}, Description: ${category.description}`
      )
      .join("\n");

    const answer = await provider.getResponseJson(
      `Based on the text provided, classify it into one of the following categories:
                        ${query}
                        Only use the text provided and return the name of the category as a string.`,
      text
    );

    if (
      typeof answer !== "string" ||
      !categories.some((cat) => cat.name === answer)
    ) {
      throw new Error("Invalid response format or category not recognized");
    }

    return answer as T;
  }
}
