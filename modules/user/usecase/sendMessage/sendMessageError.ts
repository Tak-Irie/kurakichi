import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotFoundReceiverError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, `送信先のユーザーが存在していません`, error);
  }
}

export class NotValidContentError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(false, `入力された内容が不正なものです`, error);
  }
}
