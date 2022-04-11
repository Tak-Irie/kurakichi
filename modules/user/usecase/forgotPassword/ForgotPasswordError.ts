import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class InvalidEmailError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(
      false,
      "不正なメールアドレスの形式です。入力された内容をご確認下さい。",
      error
    );
  }
}
