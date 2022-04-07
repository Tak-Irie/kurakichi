import { Result } from '../../../shared';
import { IUseCaseError } from '../../../shared';

export class AlreadyRegisteredNameError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `こちらの団体名は既に登録されております`, error);
  }
}

export class LocationNotExistError extends Result<IUseCaseError> {
  constructor(error?: Error) {
    super(false, `地図上で所在地を確認できませんでした\n番地に誤りがないか確認して下さい`, error);
  }
}
