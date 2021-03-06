import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { IUserRepository } from '../../domain/IUserRepository';
import { User } from '../../domain/User';
import * as GetUsersErrors from './GetUsersErrors';

type GetUsersResponse = Either<
  GetUsersErrors.UsersNotFoundError | UnexpectedError,
  Result<User[]>
>;

export class GetUsersUseCase
  implements IUseCase<string, Promise<GetUsersResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<GetUsersResponse> {
    const FoundResult = await this.userRepository.getUsers();

    switch (typeof FoundResult) {
      case 'undefined':
        return left(new GetUsersErrors.UsersNotFoundError());
      case 'object':
        if (FoundResult === null) {
          return left(new UnexpectedError());
        }

        return right(Result.success<User[]>(FoundResult));
      default:
        return left(new UnexpectedError());
    }
  }
}
