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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensions = void 0;
var checkIf_js_1 = require("./checkIf.js");
var extractData_js_1 = require("./extractData.js");
var question_js_1 = require("./question.js");
var summarise_js_1 = require("./summarise.js");
__exportStar(require("./extension.js"), exports);
exports.extensions = (_a = {},
    _a[summarise_js_1.Summarise.functionName] = summarise_js_1.Summarise.handle,
    _a[question_js_1.Question.functionName] = question_js_1.Question.handle,
    _a[checkIf_js_1.CheckIf.functionName] = checkIf_js_1.CheckIf.handle,
    _a[extractData_js_1.ExtractData.functionName] = extractData_js_1.ExtractData.handle,
    _a);
//# sourceMappingURL=index.js.map