import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotFoundMessagesError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, `メッセージがありません`, error);
  }
}
