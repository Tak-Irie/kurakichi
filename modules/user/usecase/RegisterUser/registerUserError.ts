import { Result } from "../../../shared/Result";
import { IIUsecaseError } from "../../../shared/usecase/IIUsecaseError";

export class EmailAlreadyExistsError extends Result<IIUsecaseError> {
  constructor(email: string, error?: Error) {
    super(false, `こちらのEmail"${email}"は既に登録されています`, error);
  }
}
