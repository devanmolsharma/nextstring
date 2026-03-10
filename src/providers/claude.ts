import Anthropic from "@anthropic-ai/sdk";
import { Provider } from "./provider";

/**
 * Provides an implementation of the `Provider` interface using the Anthropic Claude API.
 *
 * This class allows sending prompts to Claude's messages endpoint and retrieving responses
 * as either plain strings or parsed JSON objects.
 *
 * @remarks
 * - Requires an API key for authentication.
 * - Defaults to using the "claude-sonnet-4-20250514" model unless another is specified.
 *
 * @example
 * ```typescript
 * const provider = new ClaudeProvider({ apiKey: "sk-ant-..." });
 * const response = await provider.getResponseString("You are a helpful assistant.", "Hello!");
 * ```
 */
export class ClaudeProvider implements Provider {
  private anthropic: Anthropic;
  private model: string;

  /**
   * Creates an instance of the ClaudeProvider.
   *
   * @param params - Configuration parameters for the Anthropic API.
   * @param model - The model to use for completions (default: "claude-sonnet-4-20250514").
   * @param globalPrompt - A global prompt to prepend to all requests (optional).
   */
  constructor(
    params: {
      apiKey: string;
      baseURL?: string;
      [key: string]: any;
    },
    model: string = "claude-sonnet-4-20250514",
    private globalPrompt: string = ""
  ) {
    this.anthropic = new Anthropic(params);
    this.model = model;
  }

  async getResponseString(
    systemPrompt: string,
    userPrompt: string,
    model?: string
  ): Promise<string> {
    const system = this.globalPrompt
      ? `${this.globalPrompt}\n${systemPrompt}`
      : systemPrompt;

    const response = await this.anthropic.messages.create({
      model: model || this.model,
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: userPrompt }],
    });

    const block = response.content[0];
    if (block && block.type === "text") {
      return block.text;
    }
    throw new Error("No message found in the response");
  }

  async getResponseJson(
    systemPrompt: string,
    userPrompt: string,
    model?: string
  ): Promise<any> {
    const system = this.globalPrompt
      ? `${this.globalPrompt}\n${systemPrompt}`
      : systemPrompt;

    const response = await this.anthropic.messages.create({
      model: model || this.model,
      max_tokens: 4096,
      system:
        system + "\n\nYou must respond with valid JSON only, no other text.",
      messages: [{ role: "user", content: userPrompt }],
    });

    const block = response.content[0];
    if (block && block.type === "text") {
      try {
        return JSON.parse(block.text);
      } catch (error) {
        throw new Error("Failed to parse JSON response: " + error);
      }
    }
    throw new Error("No message found in the response");
  }
}
