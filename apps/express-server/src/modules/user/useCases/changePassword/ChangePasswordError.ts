import { Result } from '../../../../shared/Result';
import { IUseCaseError } from '../../../../shared/useCase/IUseCaseError';

export class InvalidPasswordError extends Result<IUseCaseError> {
  constructor() {
    super(false, '入力された"現在のパスワード"が正しくありません');
  }
}

export class InvalidNewPasswordError extends Result<IUseCaseError> {
  constructor() {
    super(false, '入力された"新しいパスワード"が不正な値です。');
  }
}
