export interface ModelOptions {
  model?: string;
}

export interface Provider {
  getResponseString(
    systemPrompt: String,
    userPrompt: String,
    model?: string
  ): Promise<String>;

  getResponseJson(
    systemPrompt: String,
    userPrompt: String,
    model?: string
  ): Promise<any>;
}
