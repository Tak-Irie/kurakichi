import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IUserRepository, User } from "../../domain";
import { UserNotExistsOrDeletedError } from "./DeleteUserError";

type DeleteUserArg = {
  userId: string;
};

type DeleteUserResponse = Either<
  | UserNotExistsOrDeletedError
  | UnexpectedError
  | StoreConnectionError
  | Result<User>,
  Result<void>
>;

export class DeleteUserUsecase
  implements IUsecase<DeleteUserArg, Promise<DeleteUserResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(request: DeleteUserArg): Promise<DeleteUserResponse> {
    try {
      const userId = UniqueEntityId.createFromArg({ id: request.userId });
      if (userId === false) return left(new InvalidInputValueError("wip", ""));

      const result = await this.userRepository.deleteUser(userId);
      if (result === undefined) {
        return left(new StoreConnectionError(""));
      }
      if (result === false) {
        return left(new UserNotExistsOrDeletedError(""));
      }

      return right(Result.success<void>(undefined));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
