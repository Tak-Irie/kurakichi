import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class NotFoundOrgError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `申請された団体が見つかりませんでした`, error);
  }
}

export class AlreadyBelongedError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `申請された団体に既に所属しています`, error);
  }
}
