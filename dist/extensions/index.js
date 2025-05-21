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
const dummyExtension_1 = require("./dummyExtension");
const summarise_1 = require("./summarise");
__exportStar(require("./extension"), exports);
exports.extensions = {
    [dummyExtension_1.DummyExtension.functionName]: dummyExtension_1.DummyExtension.handle,
    [summarise_1.Summarise.functionName]: summarise_1.Summarise.handle,
};
