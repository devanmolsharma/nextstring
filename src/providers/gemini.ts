import {
  GoogleGenAI,
  Content,
  GenerateContentConfig,
  GoogleGenAIOptions,
} from "@google/genai";
import { Provider } from "./provider";

/**
 * Provides an implementation of the `Provider` interface using the Gemini API.
 *
 * This class allows sending prompts to Gemini's chat completion endpoint and retrieving responses
 * as either plain strings or parsed JSON objects.
 *
 * @remarks
 * - Requires an API key for authentication.
 * - Defaults to using the "gemini-2.5-flash" non-thinking model unless another is specified.
 *
 * @example
 * ```typescript
 * const provider = new GeminiProvider({ apiKey: "AI..." });
 * const response = await provider.getResponseString("You are a helpful assistant.", "Hello!");
 * ```
 */
export class GeminiProvider implements Provider {
  private gemini: GoogleGenAI;
  private model: string;

  /**
   * Creates an instance of the GeminiProvider.
   *
   * @param params - Configuration parameters for the Gemini API.
   * @param model - The model to use for chat completions (default: "gemini-2.5-flash").
   * @param globalPrompt - A global prompt to prepend to all requests (optional).
   */
  constructor(
    params: GoogleGenAIOptions,
    model: string = "gemini-2.5-flash",
    private globalPrompt: string = "",
    private config: GenerateContentConfig = {
      temperature: 0.1, // Default temperature
      thinkingConfig: {
        thinkingBudget: 0, // Non thinking
      },
    }
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
      { role: "model", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: userPrompt }] },
    ];
    if (this.globalPrompt) {
      contents[0]?.parts?.unshift({ text: this.globalPrompt });
    }
    const response = await this.gemini.models.generateContent({
      model: this.model,
      contents,
      config: this.config,
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
    const contents: Content[] = [
      { role: "model", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: userPrompt }] },
    ];
    if (this.globalPrompt) {
      contents[0]?.parts?.unshift({ text: this.globalPrompt });
    }
    const response = await this.gemini.models.generateContent({
      model: this.model,
      contents,
      config: {
        ...this.config,
        responseMimeType: "application/json",
      },
    });

    const message = response.text;
    if (!message) {
      throw new Error("No message found in the response");
    }
    console.log("Response message:", message);
    try {
      return JSON.parse(message);
    } catch (error) {
      throw new Error("Failed to parse JSON response: " + error);
    }
  }
}
