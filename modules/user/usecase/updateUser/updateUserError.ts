import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class InvalidInputValueError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `入力された値が不正です`, error);
  }
}
export class UserNotExistError extends Result<IIUsecaseError> {
  constructor(error?: Error) {
    super(false, `ユーザーが存在しません`, error);
  }
}
