import { Either, left, Result, right } from '../../../shared/core';
import { IUsecase, UnexpectedError } from '../../../shared/usecase';
import { IUserRepository } from '../../domain';
import { createDTOUserFromDomain, DTOUser } from '../DTOUser';
import { UsersNotFoundError } from './GetUsersErrors';

type GetUsersResponse = Either<
  UsersNotFoundError | UnexpectedError,
  Result<DTOUser[]>
>;

export class GetUsersUsecase
  implements IUsecase<string, Promise<GetUsersResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<GetUsersResponse> {
    try {
      const dbUsers = await this.userRepository.getUsers();
      if (dbUsers == false) return left(new UsersNotFoundError(''));

      const dtoUsers = dbUsers.map((user) => createDTOUserFromDomain(user));
      // console.log('dto:', dbUsers);
      return right(Result.success<DTOUser[]>(dtoUsers));
    } catch (err: any) {
      // console.error('error:', err);
      return left(new UnexpectedError(''));
    }
  }
}
