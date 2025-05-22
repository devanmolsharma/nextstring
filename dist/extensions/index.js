import { CheckIf } from "./checkIf";
import { ExtractData } from "./extractData";
import { Question } from "./question";
import { Summarise } from "./summarise";
export * from "./extension";
export const extensions = {
    [Summarise.functionName]: Summarise.handle,
    [Question.functionName]: Question.handle,
    [CheckIf.functionName]: CheckIf.handle,
    [ExtractData.functionName]: ExtractData.handle,
};
//# sourceMappingURL=index.js.map