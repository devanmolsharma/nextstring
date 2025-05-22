"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensions = void 0;
const checkIf_1 = require("./checkIf");
const extractData_1 = require("./extractData");
const question_1 = require("./question");
const summarise_1 = require("./summarise");
__exportStar(require("./extension"), exports);
exports.extensions = {
    [summarise_1.Summarise.functionName]: summarise_1.Summarise.handle,
    [question_1.Question.functionName]: question_1.Question.handle,
    [checkIf_1.CheckIf.functionName]: checkIf_1.CheckIf.handle,
    [extractData_1.ExtractData.functionName]: extractData_1.ExtractData.handle,
};
//# sourceMappingURL=index.js.map