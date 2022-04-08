import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class NotFoundMessagesError extends Result<IUseCaseError> {
  constructor(some?: unknown, error?: Error) {
    super(false, `メッセージがありません`, error);
  }
}
