import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared/usecase";

export class IncorrectPasswordOrUserNotExist extends Result<IIUsecaseError> {
  constructor() {
    super(false, "アカウントが存在しないか、パスワードが正しくありません");
  }
}

export class InvalidEmail extends Result<IIUsecaseError> {
  constructor() {
    super(false, "アカウントが存在しないか、パスワードが正しくありません");
  }
}

export class SsoUser extends Result<IIUsecaseError> {
  constructor() {
    super(
      false,
      "ソーシャルログインを利用しています。そちらからログインして下さい"
    );
  }
}
