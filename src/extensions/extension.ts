export abstract class Extension extends String {
  static functionName: string = "" as const;
  static async handle(...data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
