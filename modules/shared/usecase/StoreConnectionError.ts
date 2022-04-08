import { IUsecaseError } from ".";
import { Result } from "../core/Result";

export class StoreConnectionError extends Result<IUsecaseError> {
  public constructor(error: Error | "NOTHING") {
    super(
      false,
      "保存できませんでした、お手数ですがユーザーサポートにお問い合わせ下さい。\nご迷惑をおかけしまして申し訳ございません。",
      error
    );
  }
}
