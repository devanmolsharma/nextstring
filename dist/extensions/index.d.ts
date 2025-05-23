import { CheckIf } from "./checkIf.js";
import { ExtractData } from "./extractData.js";
import { Question } from "./question.js";
import { Summarise } from "./summarise.js";
export * from "./extension.js";
export declare const extensions: {
    readonly summarise: typeof Summarise.handle;
    readonly question: typeof Question.handle;
    readonly checkIf: typeof CheckIf.handle;
    readonly extractData: typeof ExtractData.handle;
};
