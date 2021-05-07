import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class NotAuthorizedError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, '設定を更新する権限がありません', error);
  }
}
