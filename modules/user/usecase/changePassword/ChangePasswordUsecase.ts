import { Either, Result } from "../../../shared/core";
import {
  InvalidInputValueError,
  IUsecase,
  UnexpectedError,
} from "../../../shared/usecase";
import { IUserRepository, UserPassword } from "../../domain";
import { InvalidPasswordError, SSOUserError } from "./ChangePasswordError";

type ChangePasswordResponse = Either<
  | InvalidInputValueError
  | InvalidPasswordError
  | SSOUserError
  | UnexpectedError,
  Result<boolean>
>;

type ChangePasswordArg = {
  currentPass: string;
  newPass: string;
  userId: string;
};
export class ChangePasswordUsecase
  implements IUsecase<ChangePasswordArg, Promise<ChangePasswordResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(
    req: ChangePasswordArg
  ): Promise<ChangePasswordResponse> {
    try {
      const newPass = await UserPassword.create({
        password: req.newPass,
        isHashed: false,
      });
      if (newPass.isFailure)
        return left(new InvalidInputValueError(newPass.getErrorValue()));

      const id = UniqueEntityId.reconstruct(req.userId);
      const foundUser = await this.userRepository.getUserByUserId(
        id.getValue()
      );
      if (foundUser === undefined) return left(new StoreConnectionError());

      const storedPass = foundUser.getPassword();
      if (storedPass === "IT_IS_SSO_USER") return left(new SSOUserError());
      if (storedPass === undefined) return left(new UnexpectedError());

      const passVerified = await UserPassword.verifyPassword(
        req.currentPass,
        storedPass
      );
      if (passVerified === false) return left(new InvalidPasswordError());

      const passChanged = await this.userRepository.changeUserPassword(
        id.getValue(),
        newPass.getValue()
      );
      if (passChanged == false) return left(new StoreConnectionError());

      return right(Result.success<boolean>(true));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
