import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class NotAppropriateUserError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `お問い合わせにアクセスする権限が有りません`, error);
  }
}
