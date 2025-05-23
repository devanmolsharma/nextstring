import { CheckIf } from "./checkIf";
import { ExtractData } from "./extractData";
import { Question } from "./question";
import { Summarise } from "./summarise";
import { Translate } from "./translate";

export * from "./extension";

export const extensions = {
  [Summarise.functionName]: Summarise.handle,
  [Question.functionName]: Question.handle,
  [CheckIf.functionName]: CheckIf.handle,
  [ExtractData.functionName]: ExtractData.handle,
  [Translate.functionName]: Translate.handle,
} as const;
