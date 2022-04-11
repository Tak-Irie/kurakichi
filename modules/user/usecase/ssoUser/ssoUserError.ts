import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class EmailAlreadyExistsError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(
      false,
      `こちらのEmailは既に登録されているか\n正しい形式を満たしていません`,
      error
    );
  }
}
