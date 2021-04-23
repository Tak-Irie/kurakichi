import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  UniqueEntityId,
} from '../../../shared';
import { IOrgRepo } from '../../domain';
import { NotFoundOrgError } from './getOrgByMemberIdError';
import { DTOOrg, createDTOOrgsFromDomain } from '../DTOOrg';

type GetOrgByMemberIdArg = { memberId: string };

type GetOrgByMemberIdResponse = Either<
  NotFoundOrgError | InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOOrg[]>
>;

export class GetOrgByMemberIdUseCase
  implements IUseCase<GetOrgByMemberIdArg, Promise<GetOrgByMemberIdResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: GetOrgByMemberIdArg): Promise<GetOrgByMemberIdResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(arg.memberId);
      if (idOrError.isFailure) return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const dbResult = await this.OrgRepo.getOrgsByMemberId(idOrError.getValue());
      if (dbResult == false) return right(Result.success<DTOOrg[]>([]));

      const dtoOrgs = createDTOOrgsFromDomain(dbResult);

      return right(Result.success<DTOOrg[]>(dtoOrgs));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
