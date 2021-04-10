import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  UnexpectedError,
  UniqueEntityId,
} from '../../../shared';
import { IUserRepository, User } from '../../domain';
import * as GetUserByIdErrors from './GetUserByIdErrors';

type GetUserByIdResponse = Either<
  GetUserByIdErrors.UserNotFoundError | UnexpectedError,
  Result<User>
>;

export class GetUserByIdUseCase implements IUseCase<string, Promise<GetUserByIdResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<GetUserByIdResponse> {
    try {
      const dbResult = await this.userRepository.getUserByUserId(new UniqueEntityId(userId));

      if (dbResult === undefined) return left(new GetUserByIdErrors.UserNotFoundError(userId));

      // console.log('getUseByIdUC:', dbResult);
      return right(Result.success<User>(dbResult));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
