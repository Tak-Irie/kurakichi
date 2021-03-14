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
    try {
      const result = await this.userRepository.getUserByUserId(userId);

      if (result === undefined)
        return left(new GetUserByIdErrors.UserNotFoundError(userId));

      return right(
        Result.success<UserReadModel>({
          id: result.getId(),
          email: result.getEmail(),
          username: result.getUsername(),
        }),
      );
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
