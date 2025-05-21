import { DummyExtension } from "./dummyExtension";
export * from "./extension";

export const extensions = {
  [DummyExtension.functionName]: DummyExtension.handle,
} as const;
