import { Result } from "../core";
import { UseCaseError } from "./UseCaseError";

export class UnexpectedError extends Result<UseCaseError> {
  public constructor(error?: Error) {
    super(
      false,
      "現在、技術的な問題が発生しています。\nお手数ですが少し時間を開けてからもう一度お試しください",
      error ? error : "NOTHING"
    );
    console.error(error);
  }
}
