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
exports.OpenaiProvider = void 0;
const openai_1 = require("openai");
/**
 * Provides an implementation of the `Provider` interface using the OpenAI API.
 *
 * This class allows sending prompts to OpenAI's chat completion endpoint and retrieving responses
 * as either plain strings or parsed JSON objects.
 *
 * @remarks
 * - Requires an API key for authentication.
 * - Supports specifying a custom base URL and organization.
 * - Defaults to using the "gpt-4o-mini" model unless another is specified.
 *
 * @example
 * ```typescript
 * const provider = new OpenaiProvider({ apiKey: "sk-..." });
 * const response = await provider.getResponseString("You are a helpful assistant.", "Hello!");
 * ```
 */
class OpenaiProvider {
    constructor(params, model = "gpt-4o-mini") {
        this.openai = new openai_1.OpenAI(Object.assign(Object.assign({}, params), { baseURL: params.baseURL || "https://api.openai.com/v1" }));
        this.model = model;
    }
    getResponseString(systemPrompt, userPrompt) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
            });
            const message = response.choices[0].message;
            if (message && message.content) {
                return message.content;
            }
            throw new Error("No message found in the response");
        });
    }
    getResponseJson(systemPrompt, userPrompt) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                response_format: { type: "json_object" },
            });
            const message = response.choices[0].message;
            if (message && message.content) {
                try {
                    return JSON.parse(message.content);
                }
                catch (error) {
                    throw new Error("Failed to parse JSON response: " + error);
                }
            }
            throw new Error("No message found in the response");
        });
    }
}
exports.OpenaiProvider = OpenaiProvider;
