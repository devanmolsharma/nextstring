"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractData = void 0;
const provider_manager_1 = require("../providers/provider.manager");
const extension_1 = require("./extension");
class ExtractData extends extension_1.Extension {
    static async handle(items) {
        const data = this;
        const provider = provider_manager_1.ProviderManager.getProvider();
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
exports.ExtractData = ExtractData;
ExtractData.functionName = "extractData";
//# sourceMappingURL=extractData.js.map