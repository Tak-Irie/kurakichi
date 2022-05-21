import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotAppropriateUserError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, `メッセージにアクセスする権限が有りません`, error);
  }
}
export class NotExistsMessageByTreeId extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, `メッセージがありません`, error);
  }
}
