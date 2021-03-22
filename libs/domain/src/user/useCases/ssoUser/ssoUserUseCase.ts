import { User, UserEmail, UserName, IUserRepository } from '../../domain';
import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from '../../../shared';

type SsoUserArgs = {
  email: string;
  ssoSub: string;
  picture?: string;
};

type SsoUserDTO = {
  id: string;
  username: string;
};

type UserTypes = UserEmail | UserName;

type RegisterUserResponse = Either<
  UnexpectedError | StoreConnectionError | Result<User> | Result<UserTypes>,
  Result<SsoUserDTO>
>;

export class SsoUserUseCase implements IUseCase<SsoUserArgs, Promise<RegisterUserResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(request: SsoUserArgs): Promise<RegisterUserResponse> {
    const emailOrError = UserEmail.create({
      email: request.email,
    });

    const usernameOrError = UserName.create({
      username: request.email.split('@')[0],
    });

    const verifiedResult = Result.verifyResults<UserTypes>([emailOrError, usernameOrError]);

    if (verifiedResult.isFailure) {
      return left(Result.fail<UserTypes>(verifiedResult.getErrorValue()));
    }

    const email = emailOrError.getValue();
    const username = usernameOrError.getValue();

    try {
      const existed = await this.userRepository.getUserByEmail(email);

      if (existed) {
        return right(
          Result.success<SsoUserDTO>({
            id: existed.getId(),
            username: existed.getUsername(),
          }),
        );
      }

      const userOrError = User.create({
        id: UniqueEntityId.create(),
        email,
        username,
        ssoSub: request.ssoSub,
        picture: request.picture,
      });

      if (userOrError.isFailure) return left(Result.fail<User>(userOrError.getErrorValue()));

      const result = await this.userRepository.registerUser(userOrError.getValue());

      if (result === undefined) {
        return left(new StoreConnectionError());
      }

      return right(
        Result.success<SsoUserDTO>({
          id: result.getId(),
          username: result.getUsername(),
        }),
      );
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
