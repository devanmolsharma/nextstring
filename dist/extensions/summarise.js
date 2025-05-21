"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summarise = void 0;
const provider_manager_1 = require("../providers/provider.manager");
const extension_1 = require("./extension");
class Summarise extends extension_1.Extension {
    /**
     * Dummy implementation of the handle method.
     * @param data - The data to be handled.
     * @returns A string indicating the result of the handling.
     */
    static handle(num_words) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this;
            const provider = provider_manager_1.ProviderManager.getProvider();
            const summary = yield provider.getResponseString(`Summarise the following text in ${num_words} words`, data);
            return summary;
        });
    }
}
exports.Summarise = Summarise;
Summarise.functionName = "summarise";
