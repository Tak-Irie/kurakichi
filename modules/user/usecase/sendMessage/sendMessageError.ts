import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class ReceiverNotFoundError extends Result<IUseCaseError> {
  constructor(some: unknown, error?: Error) {
    super(false, `送信先のユーザーが存在していません`, error);
  }
}

export class ContentInvalidError extends Result<IUseCaseError> {
  constructor(content: string, error?: Error) {
    super(false, `入力された内容${content}が不正なものです`, error);
  }
}
