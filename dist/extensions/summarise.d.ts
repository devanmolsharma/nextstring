import { Extension } from "./extension";
export declare class Summarise extends Extension {
    static functionName: "summarise";
    static handle(num_words: number): Promise<String>;
}
