import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class NotFoundMemberError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `申請したユーザーが見つかりませんでした`, error);
  }
}

export class NotAuthorizedError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `申請を許可する権限が有りません`, error);
  }
}
