import { Result } from '../../../../shared/Result';
import { IUseCaseError } from '../../../../shared/useCase/IUseCaseError';

export class UserNotFoundOrDeletedError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, 'ユーザーが存在していないか、既に削除されています', error);
  }
}
