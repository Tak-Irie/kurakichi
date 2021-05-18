import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class MessageNotExistError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `メッセージが存在しません`, error);
  }
}
