import { CheckIf } from "./checkIf";
import { ExtractData } from "./extractData";
import { Question } from "./question";
import { Summarise } from "./summarise";
export * from "./extension";
export declare const extensions: {
    readonly summarise: typeof Summarise.handle;
    readonly question: typeof Question.handle;
    readonly checkIf: typeof CheckIf.handle;
    readonly extractData: typeof ExtractData.handle;
};
//# sourceMappingURL=index.d.ts.map