import { IUseCaseError } from './useCase/IUseCaseError';
import { Result } from './Result';

export class NotExistError extends Result<IUseCaseError> {
  public constructor(message: string, error?: Error) {
    super(false, message, error);
  }
}
