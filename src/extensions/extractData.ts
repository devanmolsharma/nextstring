import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class ExtractData extends Extension {
  static functionName = "extractData" as const;

  /**
   * Extracts specific data from the provided text based on the given items.
   * @param items - An array of objects defining the data to extract.
   * Each object should have a `name`, `description`, and an optional `default` value.
   * @returns A promise that resolves to an object containing the extracted data.
   * The keys are the `name` properties from the items, and the values are the extracted data.
   * If a piece of data is not found, it will return an empty string or the default value if provided.
   * @throws Will throw an error if the response format is invalid.
   * @example
   * ```typescript
   * const data = await ExtractData.handle([
   *   { name: "email", description: "User's email address" },
   *   { name: "phone", description: "User's phone number", default: "N/A" }
   * ]);
   * console.log(data); // { email: "user@example.com", phone: "123-456-7890" }
   * ```
   */
  static async handle<T extends string>(
    items: { name: T; description: string; default?: string }[]
  ): Promise<Record<T, string>> {
    const data = this as any as string;
    const provider = ProviderManager.getProvider();
    const query = items
      .map((item) => `Extract ${item.name}: ${item.description}`)
      .join("\n");

    const answer = await provider.getResponseJson(
      `Based on the data user provides, extract the following information:
            ${query}
            Only use the data provided and return the answer in JSON format with the following structure:
            {
              "name1": "value1",
              "name2": "value2",
              ...
              }
              if the data is not present, return an empty string for that field    
              `,
      data
    );

    if (typeof answer !== "object" || answer === null) {
      throw new Error("Invalid response format");
    }

    // Ensure all items are present in the answer
    for (const item of items) {
      if (!(item.name in answer) || !answer[item.name]) {
        answer[item.name] = item.default || "";
      }
    }

    return answer;
  }
}
