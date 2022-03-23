import { Result } from "../../../shared/core";
import { UseCaseError } from "../../../shared/usecase";

export class EmailAlreadyExistsError extends Result<UseCaseError> {
  constructor(email: string, error: Error) {
    super(false, `こちらのEmail"${email}"は既に登録されています`, error);
  }
}
