import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from '../../../shared';
import { IOrgRepo, Org } from '../../domain';
import { NotFoundOrgError } from './getOrgError';

type GetOrgInput = { orgId: string };

type GetOrgResponse = Either<
  NotFoundOrgError | UnexpectedError | StoreConnectionError,
  Result<Org>
>;

export class GetOrgUseCase implements IUseCase<GetOrgInput, Promise<GetOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(req: GetOrgInput): Promise<GetOrgResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(req.orgId);
      if (idOrError == undefined) return left(new NotFoundOrgError());

      const result = await this.OrgRepo.getOrgById(idOrError.getValue());
      if (result == undefined) return left(new NotFoundOrgError());

      return right(Result.success<Org>(result));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
