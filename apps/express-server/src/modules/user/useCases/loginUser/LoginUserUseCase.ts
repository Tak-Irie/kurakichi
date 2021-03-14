import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { IUserRepository } from '../../domain/IUserRepository';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { UserReadModel } from '../../domain/UserReadModel';
import * as Error from './LoginUserError';

type LoginUserResponse = Either<
  | Error.IncorrectPassword
  | Error.InvalidEmail
  | Error.SsoUser
  | UnexpectedError,
  Result<UserReadModel>
>;

type LoginUserDTO = {
  email: string;
  password: string;
};

export class LoginUserUseCase
  implements IUseCase<LoginUserDTO, Promise<LoginUserResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(req: LoginUserDTO): Promise<LoginUserResponse> {
    try {
      const email = UserEmail.create({ email: req.email });

      if (email.isFailure) return left(new Error.InvalidEmail());

      const result = await this.userRepository.getUserByEmail(email.getValue());

      if (result === undefined) return left(new Error.InvalidEmail());

      const storedPass = result.getPassword();

      if (storedPass === undefined) return left(new Error.SsoUser());

      const verified = await UserPassword.verifyPassword(
        req.password,
        storedPass.getValue(),
      );

      if (!verified) return left(new Error.IncorrectPassword());

      return right(
        Result.success<UserReadModel>({
          id: result.getId(),
          email: result.getEmail(),
        }),
      );
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
