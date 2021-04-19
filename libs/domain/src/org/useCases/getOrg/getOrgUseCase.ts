import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
  InvalidInputValueError,
} from '../../../shared';
import { IOrgRepo, Org } from '../../domain';
import { createDTOOrgFromDomain, DTOOrg } from '../DTOOrg';
import { NotFoundOrgError } from './getOrgError';

type GetOrgInput = { orgId: string };

type GetOrgResponse = Either<
  NotFoundOrgError | InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOOrg>
>;

export class GetOrgUseCase implements IUseCase<GetOrgInput, Promise<GetOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(req: GetOrgInput): Promise<GetOrgResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(req.orgId);
      if (idOrError.isFailure) return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const dbResult = await this.OrgRepo.getOrgById(idOrError.getValue());
      if (dbResult == false) return left(new NotFoundOrgError());

      const dtoOrg = createDTOOrgFromDomain(dbResult);

      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
