import { IUseCaseError } from './useCase/IUseCaseError';
import { Result } from './Result';

export class InvalidInputValueError extends Result<IUseCaseError> {
  public constructor(message: string, error?: Error) {
    super(false, message, error);
  }
}
