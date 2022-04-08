import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class UsersNotExistsError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `ユーザーが見つかりませんでした`, error);
  }
}
