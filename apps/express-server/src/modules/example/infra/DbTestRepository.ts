import { EntityRepository, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { ITestRepository } from '../domain/ITestRepository';
import { StoredTest } from '../../../graphql/entities/StoredTest';

@EntityRepository(StoredTest)
export class TypeOrmTestRepository
  extends Repository<StoredTest>
  implements ITestRepository {
  public async registerTest(test: StoredTest): Promise<StoredTest> {
    const result = await this.manager
      .create(StoredTest, {
        ...test,
        id: ulid(),
      })
      .save();

    return result || undefined;
  }

  public async getTests(): Promise<StoredTest[] | undefined> {
    const tests = await this.manager.find(StoredTest);

    return tests || undefined;
  }
}
