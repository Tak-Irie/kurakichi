import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IUserRepository } from "../../domain";
import { createDTOUserArrayFromDomain, DTOUser } from "../DTOUser";
import { NotFoundOrgError } from "./getUsersByOrgIdError";

type UsersByOrgIdArg = { orgId: string };

type GetUsersByOrgIdResponse = Either<
  | NotFoundOrgError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOUser[]>
>;

export class GetUsersByOrgIdUsecase
  implements IUsecase<UsersByOrgIdArg, Promise<GetUsersByOrgIdResponse>>
{
  constructor(private IUserRepo: IUserRepository) {
    this.IUserRepo = IUserRepo;
  }
  public async execute(arg: UsersByOrgIdArg): Promise<GetUsersByOrgIdResponse> {
    try {
      // console.log('arg:', arg);
      const orgIdOrError = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (orgIdOrError === false)
        return left(
          new InvalidInputValueError("IDの形式が正しく有りません", "")
        );

      const dbResult = await this.IUserRepo.getUsersByOrgId(orgIdOrError);
      if (dbResult == false) return left(new NotFoundOrgError(""));
      // console.log('dbResult:', dbResult);

      const dtoUsers = createDTOUserArrayFromDomain(dbResult);
      return right(Result.success<DTOUser[]>(dtoUsers));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
