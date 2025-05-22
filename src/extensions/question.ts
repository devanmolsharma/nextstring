import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class Question extends Extension {
  static functionName = "question" as const;

  /**
   * Answers the given question based on the provided data.
   * @param question - The question to be answered.
   * @returns A string containing the answer to the question.
   * @throws Error if the provider is not set or if the question answering fails.
   * @example
   * ```ts
   * const data = "This is some data that can be used to answer questions.";
   * const question = "What is the data about?";
   * const answer = await data.question(question);
   * console.log(answer); // "The data is about..."
   * ```
   */
  static async handle(question: string) {
    const data = this as any as string;
    const provider = ProviderManager.getProvider();
    const answer = await provider.getResponseString(
      `Based on the data user provides, answer this question: ${question}, only use the data provided and return only the answer, nothing else`,
      data
    );
    return answer;
  }
}
