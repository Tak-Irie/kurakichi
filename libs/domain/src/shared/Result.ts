/**
 * オブジェクトの要素型をResultクラスに格納した状態にする
 */
export type PropInResult<T> = { [P in keyof T]: Result<T[P]> };

/**
 * throw new Error を使わずにエラーハンドリングする。想定されるエラーはこちらを使用する
 * 外部ライブラリ連携及び想定外のエラーはtry-catch(err){...}する
 */
export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error: string;
  public readonly value: T;

  public constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error('不正なオペレーションが検出されました、あり得ない値の組合わせです');
    }
    if (!isSuccess && !error) {
      throw new Error('不正なオペレーションが検出されました、あり得ない値の組合わせです');
    }
    if (error) this.error = error;
    if (value) this.value = value;
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    Object.freeze(this);
  }

  /**
   * @desc Result{isFailure: true, error:string value: fail<U>}
   */
  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public getErrorValue(): string {
    return this.error;
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(true, '', value);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      this.getErrorValue();
    }

    return this.value;
  }

  public static verifyResult<U>(result: Result<U>): Result<U> {
    if (result.isFailure) {
      return Result.fail<U>(result.getErrorValue());
    }

    return Result.success<U>(result.getValue());
  }

  public static verifyResults<U>(results: Result<U>[]): Result<U>[] {
    const isInvalid = results.filter(({ isFailure }) => isFailure === true);
    if (isInvalid[0]) {
      return isInvalid;
    }
    return results;
  }
}
