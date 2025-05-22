"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIf = void 0;
const provider_manager_1 = require("../providers/provider.manager");
const extension_1 = require("./extension");
class CheckIf extends extension_1.Extension {
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
    static async handle(query) {
        const data = this;
        const provider = provider_manager_1.ProviderManager.getProvider();
        const answer = await provider.getResponseJson(`Based on the data user provides, check if this condition is true: ${query}, 
      only use the data provided and return only the answer, nothing else
      return the answer in JSON format with the following structure:
      {
        result: boolean,
      }
      `, data);
        if (answer.result === undefined) {
            throw new Error("Invalid response format");
        }
        const result = answer.result;
        const istrue = result === true ||
            result === "true" ||
            result === "yes" ||
            result === "1";
        const isfalse = result === false ||
            result === "false" ||
            result === "no" ||
            result === "0";
        if (istrue) {
            return true;
        }
        if (isfalse) {
            return false;
        }
        throw new Error("Invalid response format");
    }
}
exports.CheckIf = CheckIf;
CheckIf.functionName = "checkIf";
//# sourceMappingURL=checkIf.js.map