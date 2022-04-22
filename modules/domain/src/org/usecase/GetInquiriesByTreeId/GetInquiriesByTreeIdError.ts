import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotAppropriateUserError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `お問い合わせにアクセスする権限が有りません`, error);
  }
}
