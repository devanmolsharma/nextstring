import { OpenAI } from "openai";
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
export class OpenaiProvider implements Provider {
  private openai: OpenAI;
  private model: string;

  /**
   * Creates an instance of the OpenaiProvider.
   *
   * @param params - Configuration parameters for the OpenAI API.
   * @param model - The model to use for chat completions (default: "gpt-4o-mini").
   * @param globalPrompt - A global prompt to prepend to all requests (optional).
   */
  constructor(
    params: {
      apiKey: string;
      baseURL?: string;
      organization?: string;

      [key: string]: any;
    },
    model: string = "gpt-4o-mini",
    private globalPrompt: string = ""
  ) {
    this.openai = new OpenAI({
      ...params,
      baseURL: params.baseURL || "https://api.openai.com/v1",
    });
    this.model = model;
  }
  async getResponseString(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    const messages: {
      role: "system" | "user" | "assistant";
      content: string;
    }[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];
    if (this.globalPrompt) {
      messages.unshift({ role: "system", content: this.globalPrompt });
    }
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
  async getResponseJson(
    systemPrompt: string,
    userPrompt: string
  ): Promise<any> {
    const messages: {
      role: "system" | "user" | "assistant";
      content: string;
    }[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];
    if (this.globalPrompt) {
      messages.unshift({ role: "system", content: this.globalPrompt });
    }
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: messages,
      response_format: { type: "json_object" },
    });
    const message = response.choices[0].message;
    if (message && message.content) {
      try {
        return JSON.parse(message.content);
      } catch (error) {
        throw new Error("Failed to parse JSON response: " + error);
      }
    }
    throw new Error("No message found in the response");
  }
}
