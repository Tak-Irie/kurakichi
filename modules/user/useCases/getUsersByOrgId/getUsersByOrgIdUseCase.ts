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
} from "../../../shared";
import { IUserRepository } from "../../../user copy/domain";
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

export class GetUsersByOrgIdUseCase
  implements IUseCase<UsersByOrgIdArg, Promise<GetUsersByOrgIdResponse>>
{
  constructor(private IUserRepo: IUserRepository) {
    this.IUserRepo = IUserRepo;
  }
  public async execute(arg: UsersByOrgIdArg): Promise<GetUsersByOrgIdResponse> {
    try {
      // console.log('arg:', arg);
      const orgIdOrError = UniqueEntityId.reconstruct(arg.orgId);
      if (orgIdOrError.isFailure)
        return left(new InvalidInputValueError(orgIdOrError.getErrorValue()));

      const dbResult = await this.IUserRepo.getUsersByOrgId(
        orgIdOrError.getValue()
      );
      if (dbResult == false) return left(new NotFoundOrgError());
      // console.log('dbResult:', dbResult);

      const dtoUsers = createDTOUserArrayFromDomain(dbResult);
      return right(Result.success<DTOUser[]>(dtoUsers));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
