import { Either, IUseCase, left, Result, right, UnexpectedError } from '../../../shared';
import { IUserRepository, User } from '../../domain';
import { UsersNotFoundError } from './GetUsersErrors';

type GetUsersResponse = Either<UsersNotFoundError | UnexpectedError, Result<User[]>>;

export class GetUsersUseCase implements IUseCase<string, Promise<GetUsersResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<GetUsersResponse> {
    const FoundResult = await this.userRepository.getUsers();

    switch (typeof FoundResult) {
      case 'undefined':
        return left(new UsersNotFoundError());
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
