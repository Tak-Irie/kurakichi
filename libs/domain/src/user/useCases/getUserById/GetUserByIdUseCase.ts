import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  UnexpectedError,
  UniqueEntityId,
} from '../../../shared';
import { IUserRepository, UserReadModel } from '../../domain';
import * as GetUserByIdErrors from './GetUserByIdErrors';

type GetUserByIdResponse = Either<
  GetUserByIdErrors.UserNotFoundError | UnexpectedError,
  Result<UserReadModel>
>;

export class GetUserByIdUseCase implements IUseCase<string, Promise<GetUserByIdResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<GetUserByIdResponse> {
    try {
      const result = await this.userRepository.getUserByUserId(new UniqueEntityId(userId));

      if (result === undefined) return left(new GetUserByIdErrors.UserNotFoundError(userId));

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
