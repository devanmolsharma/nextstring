import { ModelOptions } from "../providers/provider";
import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

type ExtractDataItem = {
  name: string;
  description: string;
  default?: string;
  parse?: (value: any) => any;
};

type ExtractResult<T extends readonly ExtractDataItem[]> = {
  [K in T[number] as K["name"]]: K extends {
    parse: (...args: any[]) => infer R;
  }
    ? R
    : string;
};

export class ExtractData extends Extension {
  static functionName = "extractData" as const;

  /**
   * Extracts specific data from the provided text based on the given items.
   * @param items - An array of objects defining the data to extract.
   * Each object should have a `name`, `description`, and optionally `default` and `parse`.
   * If `parse` is provided, the extracted value will be transformed using it and the return type is inferred.
   * @param options - Optional model options to override the default model.
   * @returns A promise that resolves to an object containing the extracted data.
   * @throws Will throw an error if the response format is invalid.
   * @example
   * ```typescript
   * const data = await "John is 30 years old, email: john@example.com".extractData([
   *   { name: "email", description: "User's email address" },
   *   { name: "age", description: "User's age", parse: Number },
   * ]);
   * // data.email is string, data.age is number
   * ```
   */
  static async handle<const T extends readonly ExtractDataItem[]>(
    items: T,
    options?: ModelOptions
  ): Promise<ExtractResult<T>> {
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
      data,
      options?.model
    );

    if (typeof answer !== "object" || answer === null) {
      throw new Error("Invalid response format");
    }

    // Ensure all items are present in the answer, apply defaults and parse
    for (const item of items) {
      if (!(item.name in answer) || !answer[item.name]) {
        answer[item.name] = item.default || "";
      }
      if (item.parse) {
        answer[item.name] = item.parse(answer[item.name]);
      }
    }

    return answer;
  }
}
