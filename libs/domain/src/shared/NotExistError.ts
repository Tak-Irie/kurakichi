import { IUseCaseError } from './useCase/IUseCaseError';
import { Result } from './Result';

/**
 * @desc 個別のエラーメッセージを与えて下さい
 */
export class NotExistError extends Result<IUseCaseError> {
  public constructor(message: string, error?: Error) {
    super(false, message, error);
  }
}
