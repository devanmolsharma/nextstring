import { CheckIf } from "./checkIf";
import { ClassifyText } from "./classify";
import { ExtractData } from "./extractData";
import { Question } from "./question";
import { Rewrite } from "./rewrite";
import { Summarise } from "./summarise";
import { Translate } from "./translate";

export * from "./extension";

export const extensions = {
  [Summarise.functionName]: Summarise.handle,
  [Question.functionName]: Question.handle,
  [CheckIf.functionName]: CheckIf.handle,
  [ExtractData.functionName]: ExtractData.handle,
  [Translate.functionName]: Translate.handle,
  [ClassifyText.functionName]: ClassifyText.handle,
  [Rewrite.functionName]: Rewrite.handle,
} as const;
