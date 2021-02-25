import { EntityRepository, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { ITestRepository } from '../domain/ITestRepository';
import { DbTest } from '../../../graphql/entities/DbTest';

@EntityRepository(DbTest)
export class TypeOrmTestRepository
  extends Repository<DbTest>
  implements ITestRepository {
  public async registerTest(test: DbTest): Promise<DbTest> {
    const result = await this.manager
      .create(DbTest, {
        id: ulid(),
        ...test,
      })
      .save();

    return result || undefined;
  }

  public async getTests(): Promise<DbTest[] | undefined> {
    const tests = await this.manager.find(DbTest);

    return tests || undefined;
  }
}
