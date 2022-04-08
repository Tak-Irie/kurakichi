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
import { NotFoundOrgError } from './getOrgsByMemberIdError';
import { DTOOrg, createDTOOrgsFromDomain } from '../DTOOrg';

type GetOrgByMemberIdArg = { memberId: string };

type GetOrgsByMemberIdResponse = Either<
  NotFoundOrgError | InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOOrg[]>
>;

export class GetOrgsByMemberIdUseCase
  implements IUseCase<GetOrgByMemberIdArg, Promise<GetOrgsByMemberIdResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: GetOrgByMemberIdArg): Promise<GetOrgsByMemberIdResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(arg.memberId);
      if (idOrError.isFailure) return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const dbResult = await this.OrgRepo.getOrgsByMemberId(idOrError.getValue());
      if (dbResult == false) return right(Result.success<DTOOrg[]>([]));
      // console.log('dbResult:', dbResult);

      const dtoOrgs = createDTOOrgsFromDomain(dbResult);
      // console.log('dtoOrgs:', dtoOrgs);

      return right(Result.success<DTOOrg[]>(dtoOrgs));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
