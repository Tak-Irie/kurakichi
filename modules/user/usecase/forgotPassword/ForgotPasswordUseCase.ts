import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  UnexpectedError,
  UniqueEntityId,
} from "../../../shared";
import { RedisAuthService, SendGridMailerService } from "../../../services";
import { IUserRepository, UserEmail } from "../../../user copy/domain";
import { InvalidEmailError } from "./ForgotPasswordError";

type ForgetPasswordResponse = Either<
  InvalidEmailError | UnexpectedError,
  Result<true>
>;

export class ForgotPasswordUseCase
  implements IUseCase<string, Promise<ForgetPasswordResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(email: string): Promise<ForgetPasswordResponse> {
    const userEmail = UserEmail.create({ email });

    if (userEmail.isFailure) return left(new InvalidEmailError());

    try {
      const result = await this.userRepository.getUserByEmail(
        userEmail.getValue()
      );

      if (result === undefined) return right(Result.success<true>(true));

      const token = UniqueEntityId.create().getId();

      const stored = await RedisAuthService.storePasswordToken(
        result.getId(),
        token
      );

      // TODO: should be storeConnectionError, make this err for redis later
      if (stored === false) return left(new UnexpectedError());

      // TODO:implement interface?
      await SendGridMailerService.sendMail(result.getEmail(), token);

      return right(Result.success<true>(true));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
