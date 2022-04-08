import { IUseCaseError, Result } from '../../../shared';

export class InvalidPasswordError extends Result<IUseCaseError> {
  constructor() {
    super(false, '入力された"現在のパスワード"が正しくありません');
  }
}

export class SSOUserError extends Result<IUseCaseError> {
  constructor() {
    super(false, `ソーシャルログインを利用されています。くらきち固有のパスワードは不要です。`);
  }
}
