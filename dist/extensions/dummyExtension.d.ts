import { Extension } from "./extension";
export declare class DummyExtension extends Extension {
    static functionName: "dummyExtension";
    /**
     * Dummy implementation of the handle method.
     * @param data - The data to be handled.
     * @returns A string indicating the result of the handling.
     */
    static handle(): Promise<string>;
}
//# sourceMappingURL=dummyExtension.d.ts.map