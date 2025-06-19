import { GoogleGenAI, Content, Part } from "@google/genai";
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
  private gemini: GoogleGenAI;
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
      [key: string]: any;
    },
    model: string = "gemini-2.5-flash-preview-04-17",
    private globalPrompt: string = ""
  ) {
    this.gemini = new GoogleGenAI({
      ...params,
    });
    this.model = model;
  }

  async getResponseString(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    const contents: Content[] = [
      { role: "system", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: userPrompt }] },
    ];
    if (this.globalPrompt) {
      contents[0]?.parts?.unshift({ text: this.globalPrompt });
    }
    const response = await this.gemini.models.generateContent({
      model: this.model,
      contents,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Non thinking
        },
      },
    });
    const message = response.text;
    if (message) {
      return message;
    }
    throw new Error("No message found in the response");
  }
  async getResponseJson(
    systemPrompt: string,
    userPrompt: string
  ): Promise<any> {
    const message = await this.getResponseString(systemPrompt, userPrompt);
    try {
      return JSON.parse(message);
    } catch (error) {
      throw new Error("Failed to parse JSON response: " + error);
    }
  }
}
