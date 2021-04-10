import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class NotFoundUserError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `申請したユーザーが見つかりませんでした`, error);
  }
}

export class NotFoundOrgError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `申請された団体が見つかりませんでした`, error);
  }
}

export class NotAuthorizedError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `申請を許可する権限が有りません`, error);
  }
}

export class AlreadyUserIsMemberError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, '申請したユーザーは既に団体に所属しています', error);
  }
}
