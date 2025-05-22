import { Provider } from "./provider";
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
