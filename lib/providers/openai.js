"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiProvider = void 0;
const openai_1 = require("openai");
class OpenaiProvider {
    constructor(params, model = "gpt-4o-mini") {
        this.openai = new openai_1.OpenAI({
            ...params,
            baseURL: params.baseURL || "https://api.openai.com/v1",
        });
        this.model = model;
    }
    async getResponseString(systemPrompt, userPrompt) {
        const response = await this.openai.chat.completions.create({
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
    }
    async getResponseJson(systemPrompt, userPrompt) {
        const response = await this.openai.chat.completions.create({
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
    }
}
exports.OpenaiProvider = OpenaiProvider;
//# sourceMappingURL=openai.js.map