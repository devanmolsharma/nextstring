import { Provider } from "./provider";
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
export declare class OpenaiProvider implements Provider {
    private openai;
    private model;
    constructor(params: {
        apiKey: string;
        baseURL?: string;
        organization?: string;
        [key: string]: any;
    }, model?: string);
    getResponseString(systemPrompt: string, userPrompt: string): Promise<string>;
    getResponseJson(systemPrompt: string, userPrompt: string): Promise<any>;
}
