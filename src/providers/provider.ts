export interface Provider {
  getResponseString(systemPrompt: String, userPrompt: String): Promise<String>;

  getResponseJson(systemPrompt: String, userPrompt: String): Promise<any>;
}
