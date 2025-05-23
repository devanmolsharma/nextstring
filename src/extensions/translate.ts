import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class Translate extends Extension {
  static functionName = "translate" as const;

  static async handle(language: string) {
    const data = this as any as string;
    const provider = ProviderManager.getProvider();
    const summary = await provider.getResponseString(
      `Translate the following text to ${language}, return the answer in ${language} only, do not add any other text in english`,
      data
    );
    return summary;
  }
}
