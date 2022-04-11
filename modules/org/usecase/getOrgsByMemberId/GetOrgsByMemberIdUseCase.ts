import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  NotExistError,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IOrgRepo } from "../../domain";
import { DTOOrg, createDTOOrgsFromDomain } from "../DTOOrg";

type GetOrgByMemberIdArg = { memberId: string };

type GetOrgsByMemberIdResponse = Either<
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOOrg[]>
>;

export class GetOrgsByMemberIdUsecase
  implements IUsecase<GetOrgByMemberIdArg, Promise<GetOrgsByMemberIdResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(
    arg: GetOrgByMemberIdArg
  ): Promise<GetOrgsByMemberIdResponse> {
    try {
      const isId = UniqueEntityId.createFromArg({ id: arg.memberId });
      if (isId === false) return left(new InvalidInputValueError("wip", ""));

      const dbResult = await this.OrgRepo.getOrgsByMemberId(isId);
      if (dbResult == false) return right(Result.success<DTOOrg[]>([]));
      // console.log('dbResult:', dbResult);

      const dtoOrgs = createDTOOrgsFromDomain(dbResult);
      // console.log('dtoOrgs:', dtoOrgs);

      return right(Result.success<DTOOrg[]>(dtoOrgs));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
