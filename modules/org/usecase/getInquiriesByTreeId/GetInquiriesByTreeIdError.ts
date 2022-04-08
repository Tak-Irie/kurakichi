import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class NotAppropriateUserError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `お問い合わせにアクセスする権限が有りません`, error);
  }
}
