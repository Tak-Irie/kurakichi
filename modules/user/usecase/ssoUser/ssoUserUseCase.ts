import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import { IUsecase, StoreConnectionError } from "../../../shared/Usecase";
import { InvalidInputValueError } from "../../../shared/Usecase/InvalidInputValueError";
import { UnexpectedError } from "../../../shared/Usecase/UnexpectedError";
import { User, UserEmail, UserName, IUserRepository } from "../../domain";
import { DTOUser, createDTOUserFromDomain } from "../DTOUser";

type SsoUserArgs = {
  email: string;
  ssoSub: string;
  avatar?: string;
};

type UserTypes = UserEmail | UserName;

type RegisterUserResponse = Either<
  InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOUser>
>;

export class SsoUserUsecase
  implements IUsecase<SsoUserArgs, Promise<RegisterUserResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(arg: SsoUserArgs): Promise<RegisterUserResponse> {
    try {
      const emailOrError = UserEmail.create({
        email: arg.email,
      });

      const usernameOrError = UserName.create({
        userName: arg.email.split("@")[0],
      });

      const verifiedResult = Result.verifyResults<UserTypes>([
        emailOrError,
        usernameOrError,
      ]);

      if (verifiedResult[0].isFailure) {
        const message = verifiedResult.map((result) => result.getErrorValue());

        return left(new InvalidInputValueError(message));
      }

      const email = emailOrError.getValue();
      const userName = usernameOrError.getValue();

      const existed = await this.userRepository.getUserBySSOSub(arg.ssoSub);

      if (existed) {
        const dtoUser = createDTOUserFromDomain(existed);
        return right(Result.success<DTOUser>(dtoUser));
      }

      const ssoUser = User.createSsoUser({
        id: UniqueEntityId.createULID(),
        email,
        userName,
        ssoSub: arg.ssoSub,
        avatar: arg.avatar ? arg.avatar : "NOTHING",
      });
      // console.log('ssoUser:', ssoUser);

      const dbResult = await this.userRepository.registerUser(ssoUser);

      if (dbResult === undefined) {
        return left(new StoreConnectionError("NOTHING"));
      }
      const dtoUser = createDTOUserFromDomain(dbResult);

      return right(Result.success<DTOUser>(dtoUser));
    } catch (err) {
      console.error("err:", err);
      return left(new UnexpectedError());
    }
  }
}
