import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { IUserRepository } from '../../domain/IUserRepository';
import { EmailAlreadyExistsError } from './RegisterUserError';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { StoreConnectionError } from '../../../../shared/StoreConnectionError';

type RegisterUserInput = {
  username: string;
  email: string;
  password: string;
};

type RegisterUserDTO = {
  id: string;
  username: string;
};

type UserTypes = UserEmail | UserName | UserPassword;

type RegisterUserResponse = Either<
  | EmailAlreadyExistsError
  | UnexpectedError
  | StoreConnectionError
  | Result<UserTypes>
  | Result<User>,
  Result<RegisterUserDTO>
>;

export class RegisterUserUseCase
  implements IUseCase<RegisterUserInput, Promise<RegisterUserResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(request: RegisterUserInput): Promise<RegisterUserResponse> {
    const usernameOrError = UserName.create({
      username: request.username,
    });

    const emailOrError = UserEmail.create({
      email: request.email,
    });

    const passwordOrError = await UserPassword.create({
      password: request.password,
      isHashed: false,
    });

    const verifiedResult = Result.verifyResults<UserTypes>([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (verifiedResult.isFailure) {
      return left(Result.fail<UserTypes>(verifiedResult.getErrorValue()));
    }

    const email = emailOrError.getValue();
    const password = passwordOrError.getValue();
    const username = usernameOrError.getValue();

    try {
      const userEmailAlreadyRegistered = await this.userRepository.confirmExistence(email);

      if (userEmailAlreadyRegistered) {
        return left(new EmailAlreadyExistsError(email.props.email));
      }
      const userOrError = User.create({
        id: UniqueEntityId.create(),
        email,
        password,
        username,
      });

      if (userOrError.isFailure) return left(Result.fail<User>(userOrError.getErrorValue()));

      const result = await this.userRepository.registerUser(userOrError.getValue());

      if (result === undefined) {
        return left(new StoreConnectionError());
      }

      return right(
        Result.success<RegisterUserDTO>({
          id: result.getId(),
          username: result.getUsername(),
        }),
      );
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
