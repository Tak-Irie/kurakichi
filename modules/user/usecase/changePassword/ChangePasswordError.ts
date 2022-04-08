import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class InvalidPasswordError extends Result<IUsecaseError> {
  constructor() {
    super(false, '入力された"現在のパスワード"が正しくありません', "NOTHING");
  }
}

export class SSOUserError extends Result<IUsecaseError> {
  constructor() {
    super(
      false,
      `ソーシャルログインを利用されています。くらきち固有のパスワードは不要です。`,
      "NOTHING"
    );
  }
}
