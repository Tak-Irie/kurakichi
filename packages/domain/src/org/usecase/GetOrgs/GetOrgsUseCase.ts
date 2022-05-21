import { Either, left, Result, right } from '../../../shared/core';
import {
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from '../../../shared/usecase';
import { IOrgRepo } from '../../domain';
import { createDTOOrgsFromDomain, DTOOrg } from '../DTOOrg';
// import { SomeError } from './getOrgError';

type GetOrgsResponse = Either<
  UnexpectedError | StoreConnectionError,
  Result<DTOOrg[]>
>;

export class GetOrgsUsecase
  implements IUsecase<unknown, Promise<GetOrgsResponse>>
{
  constructor(private OrgsRepo: IOrgRepo) {
    this.OrgsRepo = OrgsRepo;
  }
  public async execute(): Promise<GetOrgsResponse> {
    try {
      const dbOrgs = await this.OrgsRepo.getOrgs();
      // console.log('dbOrgs:', dbOrgs);

      const dtoOrgs = createDTOOrgsFromDomain(dbOrgs);

      return right(Result.success<DTOOrg[]>(dtoOrgs));
    } catch (err) {
      return left(new UnexpectedError(''));
    }
  }
}
