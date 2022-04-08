import { Result } from "../../../shared/Result";
import { IIUsecaseError } from "../../../shared/usecase/IIUsecaseError";

export class InvalidEmailError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(
      false,
      "不正なメールアドレスの形式です。入力された内容をご確認下さい。",
      error
    );
  }
}
