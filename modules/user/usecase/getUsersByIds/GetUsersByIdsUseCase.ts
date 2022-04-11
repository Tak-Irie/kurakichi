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
import { UsersNotExistsError } from "./GetUsersByIdsError";

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
      const ids = arg.ids.map((id) => UniqueEntityId.createFromArg({ id }));
      if (ids.find((id) => id === false)) {
        return left(
          new InvalidInputValueError("IDの形式が正しく有りません", "")
        );
      }

      const dbResult = await this.UsersRepo.getUsersByIds(
        ids as UniqueEntityId[]
      );
      if (dbResult == false) return left(new UsersNotExistsError(""));

      const dtoUsers = createDTOUserArrayFromDomain(dbResult);
      return right(Result.success<DTOUser[]>(dtoUsers));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
