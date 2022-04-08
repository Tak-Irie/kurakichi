import { IIUsecaseError, Result } from "../../../shared";

export class UserNotFoundError extends Result<IIUsecaseError> {
  constructor(userId: string) {
    super(
      false,
      `こちらのユーザーID"${userId}"を持つユーザーは見つかりませんでした`
    );
  }
}
