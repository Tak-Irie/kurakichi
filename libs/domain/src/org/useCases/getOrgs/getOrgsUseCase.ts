import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
} from '../../../shared';
import { IOrgRepo, Org } from '../../domain';
// import { SomeError } from './getOrgError';

type GetOrgsResponse = Either<UnexpectedError | StoreConnectionError, Result<Org[]>>;

export class GetOrgsUseCase implements IUseCase<unknown, Promise<GetOrgsResponse>> {
  constructor(private OrgsRepo: IOrgRepo) {
    this.OrgsRepo = OrgsRepo;
  }
  public async execute(): Promise<GetOrgsResponse> {
    try {
      const result = await this.OrgsRepo.getOrgs();
      // console.log('ucRes:', result);
      return right(Result.success<Org[]>(result));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
