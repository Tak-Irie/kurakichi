import { Result } from "../../../shared";
import { IIUsecaseError } from "../../../shared";

export class ReceiverNotFoundError extends Result<IIUsecaseError> {
  constructor(some: unknown, error?: Error) {
    super(false, `送信先のユーザーが存在していません`, error);
  }
}

export class ContentInvalidError extends Result<IIUsecaseError> {
  constructor(content: string, error?: Error) {
    super(false, `入力された内容${content}が不正なものです`, error);
  }
}
