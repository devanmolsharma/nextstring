import { Extension } from "./extension";
export declare class CheckIf extends Extension {
    static functionName: "checkIf";
    /**
     * Checks if the given condition is true based on the provided data.
     * @param query - The condition to be checked.
     * @returns A boolean indicating whether the condition is true or false.
     * @throws Error if the provider is not set or if the condition checking fails.
     * @example
     * ```ts
     * const data = "This is some data that can be used to check conditions.";
     * const condition = "Is the data about something?";
     * const result = await data.checkIf(condition);
     * console.log(result); // true or false
     * ```
     */
    static handle(query: string): Promise<boolean>;
}
