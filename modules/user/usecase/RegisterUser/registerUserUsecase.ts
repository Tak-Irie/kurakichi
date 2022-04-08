import {
  Either,
  InvalidInputValueError,
  IUsecase,
  left,
  Result,
  right,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from "../../../shared";
import {
  IUserRepository,
  User,
  UserEmail,
  UserName,
  UserPassword,
} from "../../../user copy/domain";
import { createDTOUserFromDomain, DTOUser } from "../DTOUser";
import { EmailAlreadyExistsError } from "./RegisterUserError";

type RegisterUserArg = {
  email: string;
  password: string;
};

type UserTypes = UserEmail | UserName | UserPassword;

type RegisterUserResponse = Either<
  | InvalidInputValueError
  | EmailAlreadyExistsError
  | UnexpectedError
  | StoreConnectionError
  | Result<UserTypes>,
  Result<DTOUser>
>;

export class RegisterUserUsecase
  implements IUsecase<RegisterUserArg, Promise<RegisterUserResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(
    request: RegisterUserArg
  ): Promise<RegisterUserResponse> {
    try {
      const usernameOrError = UserName.create({
        userName: request.email.split("@")[0].slice(0, 20),
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
      // console.log('verified:', verifiedResult);

      if (verifiedResult[0].isFailure) {
        return left(
          new InvalidInputValueError(
            verifiedResult.map((result) => {
              if (result.isFailure) {
                return result.getErrorValue();
              }
              return undefined;
            })
          )
        );
      }

      const email = emailOrError.getValue();
      const password = passwordOrError.getValue();
      const userName = usernameOrError.getValue();

      const userEmailAlreadyRegistered =
        await this.userRepository.confirmExistence(email);

      if (userEmailAlreadyRegistered) {
        return left(new EmailAlreadyExistsError(email.props.email));
      }
      const user = User.create({
        id: UniqueEntityId.create(),
        email,
        password,
        userName,
      });
      // console.log('user:', user);

      const result = await this.userRepository.registerUser(user);
      if (result === undefined) {
        return left(new StoreConnectionError());
      }
      // console.log('registeredResult:', result);

      const userDTO = createDTOUserFromDomain(result);
      // console.log('userDTO:', userDTO);

      return right(Result.success<DTOUser>(userDTO));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
