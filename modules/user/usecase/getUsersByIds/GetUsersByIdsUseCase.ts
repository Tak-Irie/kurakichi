import {
  IUsecase,
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
import { UsersNotExistsError } from "./GetUsersByIdsError";
import { DTOUser, createDTOUserArrayFromDomain } from "../DTOUser";

type GetUsersByIdsArg = { ids: string[] };

type GetUsersByIdsResponse = Either<
  | UsersNotExistsError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOUser[]>
>;

export class GetUsersByIdsUsecase
  implements IUsecase<GetUsersByIdsArg, Promise<GetUsersByIdsResponse>>
{
  constructor(private UsersRepo: IUserRepository) {
    this.UsersRepo = UsersRepo;
  }
  public async execute(arg: GetUsersByIdsArg): Promise<GetUsersByIdsResponse> {
    try {
      const ids = arg.ids.map((id) => UniqueEntityId.reconstruct(id));
      if (ids.find((id) => id.isFailure)) {
        return left(new InvalidInputValueError("IDの形式が正しく有りません"));
      }

      const dbResult = await this.UsersRepo.getUsersByIds(
        ids.map((id) => id.getValue())
      );
      if (dbResult == false) return left(new UsersNotExistsError());

      const dtoUsers = createDTOUserArrayFromDomain(dbResult);
      return right(Result.success<DTOUser[]>(dtoUsers));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
