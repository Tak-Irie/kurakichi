import { Result } from '../../../shared/Result';
import { IUseCaseError } from '../../../shared/useCase/IUseCaseError';

export class InvalidEmailError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, '不正なメールアドレスの形式です。入力された内容をご確認下さい。', error);
  }
}
