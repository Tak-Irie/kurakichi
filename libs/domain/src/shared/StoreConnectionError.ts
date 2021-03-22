import { IUseCaseError } from './useCase/IUseCaseError';
import { Result } from './Result';

export class StoreConnectionError extends Result<IUseCaseError> {
  public constructor(error?: Error) {
    super(
      false,
      '保存できませんでした、お手数ですがユーザーサポートにお問い合わせ下さい。\nご迷惑をおかけしまして申し訳ございません。',
      error,
    );
  }
}
