import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { IUserRepository } from '../../domain/IUserRepository';
import { UserReadModel } from '../../domain/UserReadModel';
import * as GetUserByIdErrors from './GetUserByIdErrors';

type GetUserByIdResponse = Either<
  GetUserByIdErrors.UserNotFoundError | UnexpectedError,
  Result<UserReadModel>
>;

export class GetUserByIdUseCase
  implements IUseCase<string, Promise<GetUserByIdResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<GetUserByIdResponse> {
    const FoundResult = await this.userRepository.getUserByUserId(userId);

    switch (typeof FoundResult) {
      case 'undefined':
        return left(new GetUserByIdErrors.UserNotFoundError(userId));
      case 'object':
        if (FoundResult === null) {
          return left(new UnexpectedError());
        }

        return right(
          Result.success<UserReadModel>({
            id: FoundResult.id.getId(),
            email: FoundResult.email,
          }),
        );
      default:
        return left(new UnexpectedError());
    }
  }
}
