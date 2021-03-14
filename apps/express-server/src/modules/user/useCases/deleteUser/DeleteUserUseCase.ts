import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { User } from '../../domain/User';
import { IUserRepository } from '../../domain/IUserRepository';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { StoreConnectionError } from '../../../../shared/StoreConnectionError';
import { UserNotExistsOrDeletedError } from './DeleteUserError';

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
  implements IUseCase<DeleteUserArg, Promise<DeleteUserResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(request: DeleteUserArg): Promise<DeleteUserResponse> {
    try {
      const userId = new UniqueEntityId(request.userId);
      const result = await this.userRepository.deleteUser(userId);

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
