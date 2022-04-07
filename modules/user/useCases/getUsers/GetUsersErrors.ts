import { IUseCaseError, Result } from '../../../shared';

export class UsersNotFoundError extends Result<IUseCaseError> {
  constructor() {
    super(false, 'ユーザーが登録されていません');
  }
}
