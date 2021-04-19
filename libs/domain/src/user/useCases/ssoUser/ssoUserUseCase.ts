import { User, UserEmail, UserName, IUserRepository } from '../../domain';
import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from '../../../shared';
import { DTOUser, createDTOUserFromDomain } from '../DTOUser';

type SsoUserArgs = {
  email: string;
  ssoSub: string;
  avatar?: string;
};

type UserTypes = UserEmail | UserName;

type RegisterUserResponse = Either<
  UnexpectedError | StoreConnectionError | Result<UserTypes>,
  Result<DTOUser>
>;

export class SsoUserUseCase implements IUseCase<SsoUserArgs, Promise<RegisterUserResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(request: SsoUserArgs): Promise<RegisterUserResponse> {
    try {
      const emailOrError = UserEmail.create({
        email: request.email,
      });

      const usernameOrError = UserName.create({
        userName: request.email.split('@')[0],
      });

      const verifiedResult = Result.verifyResults<UserTypes>([emailOrError, usernameOrError]);

      if (verifiedResult.isFailure) {
        return left(Result.fail<UserTypes>(verifiedResult.getErrorValue()));
      }

      const email = emailOrError.getValue();
      const userName = usernameOrError.getValue();

      const existed = await this.userRepository.getUserByEmail(email);

      if (existed) {
        const dtoUser = createDTOUserFromDomain(existed);
        return right(Result.success<DTOUser>(dtoUser));
      }

      const ssoUser = User.createSsoUser({
        id: UniqueEntityId.create(),
        email,
        userName,
        ssoSub: request.ssoSub,
        avatar: request.avatar,
      });

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
