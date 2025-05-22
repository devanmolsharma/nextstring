import { Extension } from "./extension";
export declare class ExtractData extends Extension {
    static functionName: "extractData";
    static handle(items: {
        name: string;
        description: string;
    }[]): Promise<any>;
}
