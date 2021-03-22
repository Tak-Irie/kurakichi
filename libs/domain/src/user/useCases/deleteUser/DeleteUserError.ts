import { Result } from '../../../shared/Result';
import { IUseCaseError } from '../../../shared/useCase';

export class UserNotExistsOrDeletedError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, 'こちらのユーザーは存在しないか、既に削除されています', error);
  }
}
