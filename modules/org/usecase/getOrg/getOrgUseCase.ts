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
import { createDTOOrgFromDomain, DTOOrg } from "../DTOOrg";

type GetOrgArg = { orgId: string };

type GetOrgResponse = Either<
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOOrg>
>;

export class GetOrgUsecase
  implements IUsecase<GetOrgArg, Promise<GetOrgResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: GetOrgArg): Promise<GetOrgResponse> {
    try {
      const isId = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (isId === false) return left(new InvalidInputValueError("wip", ""));
      // console.log('id:', idOrError);

      const dbResult = await this.OrgRepo.getOrgById(isId);
      if (dbResult == false) return left(new NotExistError("存在しません", ""));
      // console.log('org:', dbResult);

      const dtoOrg = createDTOOrgFromDomain(dbResult);

      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
