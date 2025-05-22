import { Extension } from "./extension";
export declare class ExtractData extends Extension {
    static functionName: "extractData";
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
    static handle(items: {
        name: string;
        description: string;
    }[]): Promise<any>;
}
