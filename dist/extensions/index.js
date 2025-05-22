import { Summarise } from "./summarise";
export * from "./extension";
export const extensions = {
    [Summarise.functionName]: Summarise.handle,
};
//# sourceMappingURL=index.js.map