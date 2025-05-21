import { Extension } from "./extension";

export class DummyExtension extends Extension {
  static functionName = "dummyExtension" as const;

  /**
   * Dummy implementation of the handle method.
   * @param data - The data to be handled.
   * @returns A string indicating the result of the handling.
   */
  static async handle() {
    const data = this;
    // Dummy implementation of the handle method
    console.log("Handling data in DummyExtension:", data);
    return `Handled by DummyExtension: ${data}`;
  }
}
