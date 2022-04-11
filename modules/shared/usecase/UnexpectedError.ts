import { Nothing, Result } from "../core";
import { IUsecaseError } from ".";

export class UnexpectedError extends Result<IUsecaseError> {
  public constructor(error: Error | Nothing) {
    super(
      false,
      "現在、技術的な問題が発生しています。\nお手数ですが少し時間を開けてからもう一度お試しください",
      error
    );
    console.error(error);
  }
}
