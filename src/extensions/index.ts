import { CheckIf } from "./checkIf.js";
import { ExtractData } from "./extractData.js";
import { Question } from "./question.js";
import { Summarise } from "./summarise.js";

export * from "./extension.js";

export const extensions = {
  [Summarise.functionName]: Summarise.handle,
  [Question.functionName]: Question.handle,
  [CheckIf.functionName]: CheckIf.handle,
  [ExtractData.functionName]: ExtractData.handle,
} as const;
