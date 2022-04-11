import { Nothing, Result } from "../../../shared/core";
import { IUsecaseError } from "../../../shared/usecase";

export class AlreadyRegisteredNameError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(false, `こちらの団体名は既に登録されております`, error);
  }
}

export class AddressNotExistError extends Result<IUsecaseError> {
  constructor(error: Error | Nothing) {
    super(
      false,
      `地図上で所在地を確認できませんでした\n番地に誤りがないか確認して下さい`,
      error
    );
  }
}
