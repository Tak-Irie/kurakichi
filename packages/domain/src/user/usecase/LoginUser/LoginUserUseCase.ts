import { Either, left, Result, right } from '../../../shared/core';
import {
  InvalidInputValueError,
  IUsecase,
  UnexpectedError,
} from '../../../shared/usecase';
import { IUserRepository, UserEmail, UserPassword } from '../../domain';
import { createDTOUserFromDomain, DTOUser } from '../DTOUser';
import {
  NotCorrectPasswordOrNotFoundUser,
  NotFoundEmailError,
  YouAreSsoUserError,
} from './LoginUserError';

type LoginUserResponse = Either<
  | NotCorrectPasswordOrNotFoundUser
  | NotFoundEmailError
  | YouAreSsoUserError
  | UnexpectedError,
  Result<DTOUser>
>;

type LoginUserArg = {
  email: string;
  password: string;
};

export class LoginUserUsecase
  implements IUsecase<LoginUserArg, Promise<LoginUserResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(arg: LoginUserArg): Promise<LoginUserResponse> {
    try {
      // console.log('login-arg:', arg);
      const email = UserEmail.create({ email: arg.email });
      if (email.isFailure)
        return left(new InvalidInputValueError(email.getErrorValue(), ''));

      const dbUser = await this.userRepository.getUserByEmail(email.getValue());
      if (dbUser === undefined) return left(new NotFoundEmailError(''));

      const storedPass = dbUser.getPassword();
      if (storedPass === undefined) return left(new YouAreSsoUserError(''));

      const passwordVerified = await UserPassword.verifyPassword(
        arg.password,
        storedPass,
      );
      if (!passwordVerified)
        return left(new NotCorrectPasswordOrNotFoundUser(''));

      const dtoUser = createDTOUserFromDomain(dbUser);

      return right(Result.success<DTOUser>(dtoUser));
    } catch (err) {
      return left(new UnexpectedError(''));
    }
  }
}
