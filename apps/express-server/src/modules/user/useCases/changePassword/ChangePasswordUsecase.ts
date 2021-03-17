import { StoreConnectionError } from '../../../../shared/StoreConnectionError';
import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { IUserRepository } from '../../domain/IUserRepository';
import { UserPassword } from '../../domain/UserPassword';
import { InvalidPasswordError, InvalidNewPasswordError } from './ChangePasswordError';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';

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
      const newPass = UserPassword.create({ password: req.newPass });
      if (newPass.isFailure) return left(new InvalidNewPasswordError());

      const id = new UniqueEntityId(req.userId);
      const foundUser = await this.userRepository.getUserByUserId(id);

      if (foundUser === undefined) return left(new StoreConnectionError());

      const passExisted = foundUser.getPassword();

      // TODO: add pattern foundUser use sso
      // FIXME:
      if (passExisted === undefined) return left(new UnexpectedError());

      const passVerified = await UserPassword.verifyPassword(req.currentPass, passExisted);

      if (passVerified === false) return left(new InvalidPasswordError());

      const passChanged = await this.userRepository.changeUserPassword(id, newPass.getValue());
      if (passChanged == false) return left(new StoreConnectionError());

      return right(Result.success<boolean>(true));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
