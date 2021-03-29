import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class NotFoundOrgError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `申請された団体が見つかりませんでした`, error);
  }
}
