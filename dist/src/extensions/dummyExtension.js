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
exports.DummyExtension = void 0;
const extension_1 = require("./extension");
class DummyExtension extends extension_1.Extension {
    /**
     * Dummy implementation of the handle method.
     * @param data - The data to be handled.
     * @returns A string indicating the result of the handling.
     */
    static handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this;
            // Dummy implementation of the handle method
            console.log("Handling data in DummyExtension:", data);
            return `Handled by DummyExtension: ${data}`;
        });
    }
}
exports.DummyExtension = DummyExtension;
DummyExtension.functionName = "dummyExtension";
