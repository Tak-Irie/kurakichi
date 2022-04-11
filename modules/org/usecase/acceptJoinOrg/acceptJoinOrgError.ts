import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotFoundUserError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `申請したユーザーが見つかりませんでした`, error);
  }
}

export class NotFoundOrgError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `申請された団体が見つかりませんでした`, error);
  }
}

export class NotAuthorizedError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `申請を許可する権限が有りません`, error);
  }
}

export class AlreadyUserIsMemberError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, "申請したユーザーは既に団体に所属しています", error);
  }
}
