"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summarise = void 0;
const provider_manager_1 = require("../providers/provider.manager");
const extension_1 = require("./extension");
class Summarise extends extension_1.Extension {
    static async handle(num_words) {
        const data = this;
        const provider = provider_manager_1.ProviderManager.getProvider();
        const summary = await provider.getResponseString(`Summarise the following text in ${num_words} words`, data);
        return summary;
    }
}
exports.Summarise = Summarise;
Summarise.functionName = "summarise";
//# sourceMappingURL=summarise.js.map