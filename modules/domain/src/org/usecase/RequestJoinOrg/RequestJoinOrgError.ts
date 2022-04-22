import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class NotFoundOrgError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `申請した団体が見つかりませんでした`, error);
  }
}
export class NotAcceptJoinError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `申請した団体は新規の参加を受け付けていません`, error);
  }
}

export class AlreadyBelongedError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `申請された団体に既に所属しています`, error);
  }
}
