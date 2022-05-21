import { IUsecaseError } from ".";
import { Nothing, Result } from "../core";

/**
 * @desc 個別のエラーメッセージを与えて下さい
 */
export class NotExistError extends Result<IUsecaseError> {
  public constructor(message: string, error: Error | Nothing) {
    super(false, message, error);
  }
}
