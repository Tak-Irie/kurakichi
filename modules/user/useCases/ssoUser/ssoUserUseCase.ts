import { User, UserEmail, UserName, IUserRepository } from "../../domain";
import {
  Either,
  InvalidInputValueError,
  IUseCase,
  left,
  Result,
  right,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from "../../../shared";
import { DTOUser, createDTOUserFromDomain } from "../DTOUser";

type SsoUserArgs = {
  email: string;
  ssoSub: string;
  avatar?: string;
};

type UserTypes = UserEmail | UserName;

type RegisterUserResponse = Either<
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError
  | Result<UserTypes>,
  Result<DTOUser>
>;

export class SsoUserUseCase
  implements IUseCase<SsoUserArgs, Promise<RegisterUserResponse>>
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
      const userName = usernameOrError.getValue();

      const existed = await this.userRepository.getUserBySSOSub(arg.ssoSub);

      if (existed) {
        const dtoUser = createDTOUserFromDomain(existed);
        return right(Result.success<DTOUser>(dtoUser));
      }

      const ssoUser = User.createSsoUser({
        id: UniqueEntityId.create(),
        email,
        userName,
        ssoSub: arg.ssoSub,
        avatar: arg.avatar,
      });
      // console.log('ssoUser:', ssoUser);

      const dbResult = await this.userRepository.registerUser(ssoUser);

      if (dbResult === undefined) {
        return left(new StoreConnectionError());
      }
      const dtoUser = createDTOUserFromDomain(dbResult);

      return right(Result.success<DTOUser>(dtoUser));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
