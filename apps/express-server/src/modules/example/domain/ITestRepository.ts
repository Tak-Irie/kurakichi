export interface ITestRepository {
  registerTest(test: any): Promise<any>;
  getTests(): Promise<any[] | undefined>;
}
