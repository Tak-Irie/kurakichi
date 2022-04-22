import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class MessageNotExistError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `メッセージが存在しません`, error);
  }
}
