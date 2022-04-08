import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class NotFoundMessagesError extends Result<IIUsecaseError> {
  constructor(some?: unknown, error?: Error) {
    super(false, `メッセージがありません`, error);
  }
}
