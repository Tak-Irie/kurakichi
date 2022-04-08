import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import { IUsecase } from "../../../shared/Usecase";
import { UnexpectedError } from "../../../shared/Usecase/UnexpectedError";
import { IUserRepository } from "../../domain/IUserRepository";
import { UserNotFoundOrDeletedError } from "./LogoutUserErrors";

type LogoutUserResponse = Either<
  UserNotFoundOrDeletedError | UnexpectedError,
  Result<void>
>;

type LogoutArg = {
  userId: string;
};

export class LogoutUserUsecase
  implements IUsecase<LogoutArg, Promise<LogoutUserResponse>>
{
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute(request: LogoutArg): Promise<LogoutUserResponse> {
    const { userId } = request;

    try {
      const user = await this.userRepo.getUserByUserId(
        UniqueEntityId.restoreFromRepo({ id: userId })
      );

      if (user === undefined) {
        return left(new UserNotFoundOrDeletedError());
      }
      // TODO: OIDCとRedisを組み込んだAuthサービスをつくる
      return right(Result.success<void>(undefined));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
