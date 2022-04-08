import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class MessageNotExistError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `メッセージが存在しません`, error);
  }
}
