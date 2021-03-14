import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { IUserRepository } from '../../domain/IUserRepository';
import { UserNotFoundOrDeletedError } from './LogoutUserErrors';

type LogoutUserResponse = Either<
  UserNotFoundOrDeletedError | UnexpectedError,
  Result<void>
>;

type LogoutDTO = {
  userId: string;
};

export class LogoutUserUseCase
  implements IUseCase<LogoutDTO, Promise<LogoutUserResponse>> {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute(request: LogoutDTO): Promise<LogoutUserResponse> {
    const { userId } = request;

    try {
      const user = await this.userRepo.getUserByUserId(userId);

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
