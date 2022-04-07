import { IUseCaseError, Result } from '../../../shared';

export class UserNotFoundError extends Result<IUseCaseError> {
  constructor(userId: string) {
    super(false, `こちらのユーザーID"${userId}"を持つユーザーは見つかりませんでした`);
  }
}
