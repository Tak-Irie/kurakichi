import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared/useCase';

export class IncorrectPasswordOrUserNotExist extends Result<IUseCaseError> {
  constructor() {
    super(false, 'アカウントが存在しないか、パスワードが正しくありません');
  }
}

export class InvalidEmail extends Result<IUseCaseError> {
  constructor() {
    super(false, 'アカウントが存在しないか、パスワードが正しくありません');
  }
}

export class SsoUser extends Result<IUseCaseError> {
  constructor() {
    super(false, 'ソーシャルログインを利用しています。そちらからログインして下さい');
  }
}
