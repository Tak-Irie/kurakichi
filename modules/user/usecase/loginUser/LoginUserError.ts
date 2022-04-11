import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotCorrectPasswordOrNotFoundUser extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(
      false,
      "アカウントが存在しないか、パスワードが正しくありません",
      error
    );
  }
}

export class NotFoundEmailError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, "アカウントが存在しません", error);
  }
}

export class YouAreSsoUserError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(
      false,
      "ソーシャルログインを利用しています。そちらからログインして下さい",
      error
    );
  }
}
