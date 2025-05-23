"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialise = initialise;
var index_js_1 = require("./extensions/index.js");
var provider_manager_js_1 = require("./providers/provider.manager.js");
var _loop_1 = function (key) {
    // @ts-ignore
    String.prototype[key] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // @ts-ignore
        return index_js_1.extensions[key].apply(this, args);
    };
};
// Extend the String prototype with the extensions
for (var _i = 0, _a = Object.keys(index_js_1.extensions); _i < _a.length; _i++) {
    var key = _a[_i];
    _loop_1(key);
}
function initialise(provider) {
    provider_manager_js_1.ProviderManager.setProvider(provider);
}
//# sourceMappingURL=main.js.map