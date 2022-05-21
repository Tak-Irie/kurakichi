import { Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase/IUsecaseError";

export class EmailAlreadyExistsError extends Result<IUsecaseError> {
  constructor(error: Error | "") {
    super(
      false,
      `こちらのEmailは既に登録されているか\n形式を満たしていません`,
      error
    );
  }
}
