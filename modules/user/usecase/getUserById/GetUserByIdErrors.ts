import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class UserNotFoundError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, `こちらのIDを持つユーザーは見つかりませんでした`, error);
  }
}
