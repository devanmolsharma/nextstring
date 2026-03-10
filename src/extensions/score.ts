import { ModelOptions } from "../providers/provider";
import { ProviderManager } from "../providers/provider.manager";
import { Extension } from "./extension";

export class Score extends Extension {
  static functionName = "score" as const;

  /**
   * Scores the text against a set of rubrics, returning a numeric score for each.
   * @param rubrics - An array of rubric objects with `name`, `description`, and `id`.
   * @param options - Optional model options to override the default model.
   * @returns A promise resolving to an object mapping each rubric `id` to a numeric score (0-10).
   * @throws Error if the provider is not set or if scoring fails.
   * @example
   * ```ts
   * const result = await "The quick brown fox jumps over the lazy dog.".score([
   *   { id: "grammar", name: "Grammar", description: "Correct grammar and punctuation" },
   *   { id: "clarity", name: "Clarity", description: "Clear and easy to understand" },
   * ]);
   * console.log(result); // { grammar: 9, clarity: 8 }
   * ```
   */
  static async handle<T extends string>(
    rubrics: { name: string; description: string; id: T }[],
    options?: ModelOptions
  ): Promise<Record<T, number>> {
    const text = this as any as string;
    const provider = ProviderManager.getProvider();

    const rubricList = rubrics
      .map((r) => `"${r.id}" - ${r.name}: ${r.description}`)
      .join("\n");

    const answer = await provider.getResponseJson(
      `Score the provided text against each of the following rubrics on a scale of 0 to 10.
Rubrics:
${rubricList}
Return a JSON object mapping each rubric id to its numeric score.
{
  "rubricId1": <number>,
  "rubricId2": <number>
}
Only return the JSON, nothing else.`,
      text,
      options?.model
    );

    if (typeof answer !== "object" || answer === null) {
      throw new Error("Invalid response format");
    }

    for (const rubric of rubrics) {
      if (!(rubric.id in answer)) {
        answer[rubric.id] = 0;
      }
      answer[rubric.id] = Number(answer[rubric.id]);
      if (isNaN(answer[rubric.id])) {
        answer[rubric.id] = 0;
      }
    }

    return answer;
  }
}
