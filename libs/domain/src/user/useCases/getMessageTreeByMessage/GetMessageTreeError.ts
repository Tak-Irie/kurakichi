import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class NotAppropriateUserError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `メッセージにアクセスする権限が有りません`, error);
  }
}
