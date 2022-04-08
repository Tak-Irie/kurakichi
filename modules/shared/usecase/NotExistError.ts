import { IUsecaseError } from ".";
import { Result } from "../core";

/**
 * @desc 個別のエラーメッセージを与えて下さい
 */
export class NotExistError extends Result<IUsecaseError> {
  public constructor(message: string, error: Error | "NOTHING") {
    super(false, message, error);
  }
}
