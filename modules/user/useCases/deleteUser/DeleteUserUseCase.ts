import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from "../../../shared";
import { IUserRepository, User } from "../../../user copy/domain";
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

export class DeleteUserUseCase
  implements IUseCase<DeleteUserArg, Promise<DeleteUserResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(request: DeleteUserArg): Promise<DeleteUserResponse> {
    try {
      const userId = UniqueEntityId.reconstruct(request.userId);
      const result = await this.userRepository.deleteUser(userId.getValue());

      if (result === undefined) {
        return left(new StoreConnectionError());
      }
      if (result === false) {
        return left(new UserNotExistsOrDeletedError());
      }

      return right(Result.success<void>());
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
