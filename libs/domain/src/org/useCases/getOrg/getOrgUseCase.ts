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

type OrgInput = { orgId: string };

type getOrgResponse = Either<
  NotFoundOrgError | UnexpectedError | StoreConnectionError | Result<Org>,
  Result<Org>
>;

export class getOrgUseCase implements IUseCase<OrgInput, Promise<getOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(req: OrgInput): Promise<getOrgResponse> {
    try {
      const idOrError = new UniqueEntityId(req.orgId);
      if (idOrError == undefined) return left(new NotFoundOrgError());

      const result = await this.OrgRepo.getOrgById(idOrError);
      if (result == undefined) return left(new NotFoundOrgError());

      return right(Result.success<Org>(result));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
