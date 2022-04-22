import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import { RedisAuthAPI, SendGridAPI } from "../../../shared/infra";
import { IUsecase, UnexpectedError } from "../../../shared/usecase";
import { IUserRepository, UserEmail } from "../../domain";
import { InvalidEmailError } from "./ForgotPasswordError";

type ForgetPasswordResponse = Either<
  InvalidEmailError | UnexpectedError,
  Result<true>
>;

export class ForgotPasswordUsecase
  implements IUsecase<string, Promise<ForgetPasswordResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(email: string): Promise<ForgetPasswordResponse> {
    const userEmail = UserEmail.create({ email });

    if (userEmail.isFailure) return left(new InvalidEmailError(""));

    try {
      const result = await this.userRepository.getUserByEmail(
        userEmail.getValue()
      );

      if (result === undefined) return right(Result.success<true>(true));

      const token = UniqueEntityId.createULID().getId();

      const stored = await RedisAuthAPI.storePasswordToken(
        result.getId(),
        token
      );

      // TODO: should be storeConnectionError, make this err for redis later
      if (stored === false) return left(new UnexpectedError(""));

      // TODO:implement interface?
      await SendGridAPI.sendMail(result.getEmail(), token);

      return right(Result.success<true>(true));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
