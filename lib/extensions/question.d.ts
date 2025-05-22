import { Extension } from "./extension";
export declare class Question extends Extension {
    static functionName: "question";
    static handle(question: string): Promise<String>;
}
