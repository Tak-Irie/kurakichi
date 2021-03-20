import { IUseCaseError, Result } from '../../../shared';

export class InvalidPasswordError extends Result<IUseCaseError> {
  constructor() {
    super(false, '入力された"現在のパスワード"が正しくありません');
  }
}

export class InvalidNewPasswordError extends Result<IUseCaseError> {
  constructor() {
    super(false, '入力された新しいパスワードが不正な値です。');
  }
}
