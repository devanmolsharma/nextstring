export declare abstract class Extension extends String {
    static functionName: string;
    static handle(...data: any): Promise<any>;
}
