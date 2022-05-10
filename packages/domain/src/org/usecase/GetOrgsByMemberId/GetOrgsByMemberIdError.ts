import { Nothing, Result } from '../../../shared/core';
import { IUsecaseError } from '../../../shared/usecase';

export class NotFoundOrgError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `団体が存在していません`, error);
  }
}
