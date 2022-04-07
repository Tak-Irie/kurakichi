import { IUseCaseError } from "../../shared copy/useCase/IUseCaseError";
import { Result } from "../../shared copy/Result";

/**
 * @desc 個別のエラーメッセージを与えて下さい
 */
export class NotExistError extends Result<IUseCaseError> {
  public constructor(message: string, error?: Error) {
    super(false, message, error);
  }
}
