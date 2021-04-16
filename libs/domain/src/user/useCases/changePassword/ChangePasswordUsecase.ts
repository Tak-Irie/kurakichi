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
import { IUserRepository, UserPassword } from '../../domain';
import { InvalidPasswordError, InvalidNewPasswordError } from './ChangePasswordError';

type ChangePasswordResponse = Either<
  InvalidPasswordError | InvalidNewPasswordError | UnexpectedError,
  Result<boolean>
>;

type ChangePasswordArg = {
  currentPass: string;
  newPass: string;
  userId: string;
};
export class ChangePasswordUseCase
  implements IUseCase<ChangePasswordArg, Promise<ChangePasswordResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(req: ChangePasswordArg): Promise<ChangePasswordResponse> {
    try {
      const newPass = await UserPassword.create({ password: req.newPass, isHashed: false });
      // FIXME:need fix error message handling
      if (newPass.isFailure) return left(new InvalidNewPasswordError());

      const id = UniqueEntityId.reconstruct(req.userId);

      const foundUser = await this.userRepository.getUserByUserId(id.getValue());

      if (foundUser === undefined) return left(new StoreConnectionError());

      const storedEncryptedPass = foundUser.getPassword();

      // TODO: add pattern foundUser use sso
      // FIXME:
      if (storedEncryptedPass === undefined) return left(new UnexpectedError());

      const passVerified = await UserPassword.verifyPassword(req.currentPass, storedEncryptedPass);

      if (passVerified === false) return left(new InvalidPasswordError());

      const passChanged = await this.userRepository.changeUserPassword(
        id.getValue(),
        newPass.getValue(),
      );
      if (passChanged == false) return left(new StoreConnectionError());

      return right(Result.success<boolean>(true));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
