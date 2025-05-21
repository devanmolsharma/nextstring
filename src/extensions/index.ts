import { DummyExtension } from "./dummyExtension";
import { Summarise } from "./summarise";
export * from "./extension";

export const extensions = {
  [DummyExtension.functionName]: DummyExtension.handle,
  [Summarise.functionName]: Summarise.handle,
} as const;
