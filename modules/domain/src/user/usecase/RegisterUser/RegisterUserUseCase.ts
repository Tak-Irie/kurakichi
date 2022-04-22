import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import {
  IUserRepository,
  User,
  UserEmail,
  UserName,
  UserPassword,
} from "../../domain";
import { createDTOUserFromDomain, DTOUser } from "../DTOUser";
import { EmailAlreadyExistsError } from "./RegisterUserError";

type RegisterUserArg = {
  email: string;
  password: string;
};

type RegisterUserResponse = Either<
  | InvalidInputValueError
  | EmailAlreadyExistsError
  | UnexpectedError
  | StoreConnectionError
  | Result<UserTypes>,
  Result<DTOUser>
>;

type UserTypes = UserEmail | UserName | UserPassword;

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
              return result.getErrorValue();
            }),
            ""
          )
        );
      }

      const email = emailOrError.getValue();
      const password = passwordOrError.getValue();
      const userName = usernameOrError.getValue();

      const userEmailAlreadyRegistered =
        await this.userRepository.confirmExistence(email);

      if (userEmailAlreadyRegistered) {
        return left(new EmailAlreadyExistsError(""));
      }
      const user = User.create({
        id: UniqueEntityId.createULID(),
        email,
        password,
        userName,
      });
      // console.log('user:', user);

      const result = await this.userRepository.registerUser(user);
      if (result === undefined) {
        return left(new StoreConnectionError(""));
      }
      // console.log('registeredResult:', result);

      const userDTO = createDTOUserFromDomain(result);
      // console.log('userDTO:', userDTO);

      return right(Result.success<DTOUser>(userDTO));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
