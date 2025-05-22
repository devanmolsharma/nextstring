import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";
export class ExtractData extends Extension {
    /**
     * Extracts specific data based on the provided list of items and their descriptions.
     * @param items - An array of objects containing `name` and `description` of the data to extract.
     * @returns An object with the extracted data.
     * @throws Error if the provider is not set or if the extraction fails.
     * @example
     * ```ts
     * const data = "This is some data containing various details.";
     * const items = [
     *   { name: "email", description: "The email address in the data" },
     *   { name: "phone", description: "The phone number in the data" }
     * ];
     * const result = await data.extractData(items);
     * console.log(result); // { email: "example@example.com", phone: "123-456-7890" }
     * ```
     */
    static async handle(items) {
        const data = this;
        const provider = ProviderManager.getProvider();
        const query = items
            .map((item) => `Extract ${item.name}: ${item.description}`)
            .join("\n");
        const answer = await provider.getResponseJson(`Based on the data user provides, extract the following information:
            ${query}
            Only use the data provided and return the answer in JSON format with the following structure:
            {
                "name1": "value1",
                "name2": "value2",
                ...
            }`, data);
        if (typeof answer !== "object" || answer === null) {
            throw new Error("Invalid response format");
        }
        return answer;
    }
}
ExtractData.functionName = "extractData";
//# sourceMappingURL=extractData.js.map