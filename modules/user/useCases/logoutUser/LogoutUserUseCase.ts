import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  UnexpectedError,
  UniqueEntityId,
} from "../../../shared";
import { IUserRepository } from "../../../user copy/domain";
import { UserNotFoundOrDeletedError } from "./LogoutUserErrors";

type LogoutUserResponse = Either<
  UserNotFoundOrDeletedError | UnexpectedError,
  Result<void>
>;

type LogoutArg = {
  userId: string;
};

export class LogoutUserUseCase
  implements IUseCase<LogoutArg, Promise<LogoutUserResponse>>
{
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute(request: LogoutArg): Promise<LogoutUserResponse> {
    const { userId } = request;

    try {
      const user = await this.userRepo.getUserByUserId(
        UniqueEntityId.reconstruct(userId).getValue()
      );

      if (user === undefined) {
        return left(new UserNotFoundOrDeletedError());
      }
      // TODO: OIDCとRedisを組み込んだAuthサービスをつくる
      return right(Result.success<void>());
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
