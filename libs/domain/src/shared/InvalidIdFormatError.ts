import { IUseCaseError } from './useCase/IUseCaseError';
import { Result } from './Result';

export class InvalidIdFormatError extends Result<IUseCaseError> {
  public constructor(error?: Error) {
    super(false, 'IDが不正な形式です', error);
  }
}
