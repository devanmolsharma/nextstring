import { Extension } from "./extension";
export declare class Question extends Extension {
    static functionName: "question";
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
    static handle(question: string): Promise<String>;
}
