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
exports.initialise = initialise;
var extensions_1 = require("./extensions");
var provider_manager_1 = require("./providers/provider.manager");
var _loop_1 = function (key) {
    // @ts-ignore
    String.prototype[key] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // @ts-ignore
        return extensions_1.extensions[key].apply(this, args);
    };
};
// Extend the String prototype with the extensions
for (var _i = 0, _a = Object.keys(extensions_1.extensions); _i < _a.length; _i++) {
    var key = _a[_i];
    _loop_1(key);
}
function initialise(provider) {
    provider_manager_1.ProviderManager.setProvider(provider);
}
__exportStar(require("./providers"), exports);
//# sourceMappingURL=index.js.map