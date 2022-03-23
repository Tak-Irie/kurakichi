import {
  Either,
  left,
  Result,
  right,
  UseCase,
  Guard,
  UnexpectedAppError,
} from "../../../shared/core";
import { UniqueEntityID } from "../../../shared/domain";
import {
  InputInvalidValueError,
  StoreConnectionError,
} from "../../../shared/usecase";
import {
  User,
  UserEmail,
  UserName,
  UserPassword,
  UserRepository,
} from "../../domain";
import { EmailAlreadyExistsError } from "./registerUserError";

type RegisterUserArg = {
  email: string;
  password: string;
};

type RegisterUserResponse = Either<
  InputInvalidValueError | EmailAlreadyExistsError | StoreConnectionError,
  Result<User>
>;

export class RegisterUserUseCase
  implements UseCase<RegisterUserArg, Promise<RegisterUserResponse>>
{
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(arg: RegisterUserArg): Promise<RegisterUserResponse> {
    try {
      const emailResult = UserEmail.create({ email: arg.email });

      if (emailResult.isFailure)
        return left(
          new InputInvalidValueError(emailResult.getErrorValue(), "NOTHING")
        );

      const passResult = await UserPassword.create({
        password: arg.password,
        isHashed: false,
      });

      if (passResult.isFailure) {
        return left(
          new InputInvalidValueError(passResult.getErrorValue(), "NOTHING")
        );
      }

      const userName = UserName.create({
        userName: "test" + arg.email.split("@")[0],
      }).getValue();

      const user = User.create({
        id: new UniqueEntityID(),
        email: emailResult.getValue(),
        password: passResult.getValue(),
        userName,
      });

      const result = await this.userRepository.registerUser(user);

      if (!result) {
        return left(new StoreConnectionError("NOTHING"));
      }

      return right(Result.success(user));
    } catch (err) {
      return left(new UnexpectedAppError(err));
    }
  }
}
