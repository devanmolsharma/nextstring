import { Extension } from "./extension";
export declare class CheckIf extends Extension {
    static functionName: "checkIf";
    static handle(query: string): Promise<boolean>;
}
