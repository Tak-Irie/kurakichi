import { Either, IUseCase, left, Result, right, UnexpectedError } from '../../../shared';
import { IUserRepository, User, UserEmail, UserPassword, UserReadModel } from '../../domain';
import * as Error from './LoginUserError';

type LoginUserResponse = Either<
  Error.IncorrectPassword | Error.InvalidEmail | Error.SsoUser | UnexpectedError,
  Result<User>
>;

type LoginUserArg = {
  email: string;
  password: string;
};

export class LoginUserUseCase implements IUseCase<LoginUserArg, Promise<LoginUserResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(arg: LoginUserArg): Promise<LoginUserResponse> {
    try {
      const email = UserEmail.create({ email: arg.email });

      if (email.isFailure) return left(new Error.InvalidEmail());

      const foundUser = await this.userRepository.getUserByEmail(email.getValue());

      if (foundUser === undefined) return left(new Error.InvalidEmail());

      const storedPass = foundUser.getPassword();

      if (storedPass === undefined) return left(new Error.SsoUser());

      const passwordVerified = await UserPassword.verifyPassword(arg.password, storedPass);

      if (!passwordVerified) return left(new Error.IncorrectPassword());

      return right(Result.success<User>(foundUser));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
