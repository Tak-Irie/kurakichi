import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  UnexpectedError,
} from "../../../shared";
import {
  IUserRepository,
  UserEmail,
  UserPassword,
} from "../../../user copy/domain";
import { DTOUser, createDTOUserFromDomain } from "../DTOUser";
import {
  IncorrectPasswordOrUserNotExist,
  InvalidEmail,
  SsoUser,
} from "./LoginUserError";

type LoginUserResponse = Either<
  IncorrectPasswordOrUserNotExist | InvalidEmail | SsoUser | UnexpectedError,
  Result<DTOUser>
>;

type LoginUserArg = {
  email: string;
  password: string;
};

export class LoginUserUseCase
  implements IUseCase<LoginUserArg, Promise<LoginUserResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(arg: LoginUserArg): Promise<LoginUserResponse> {
    try {
      const email = UserEmail.create({ email: arg.email });
      if (email.isFailure) return left(new InvalidEmail());

      const dbUser = await this.userRepository.getUserByEmail(email.getValue());
      if (dbUser === undefined)
        return left(new IncorrectPasswordOrUserNotExist());

      const storedPass = dbUser.getPassword();
      if (storedPass === undefined) return left(new SsoUser());

      const passwordVerified = await UserPassword.verifyPassword(
        arg.password,
        storedPass
      );
      if (!passwordVerified) return left(new IncorrectPasswordOrUserNotExist());

      const dtoUser = createDTOUserFromDomain(dbUser);

      return right(Result.success<DTOUser>(dtoUser));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
