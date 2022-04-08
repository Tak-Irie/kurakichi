import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class NotAppropriateUserError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `メッセージにアクセスする権限が有りません`, error);
  }
}
