import { Guard, Result } from "../../shared/core";
import { Validation } from "../../shared/core/Validation";
import { ValueObject } from "../../shared/domain/ValueObject";

type OrgNameProps = {
  name: string;
};

export class OrgName extends ValueObject<OrgNameProps> {
  public static MIN_LENGTH = 2;
  public static MAX_LENGTH = 30;

  private constructor(props: OrgNameProps) {
    super(props);
  }

  getValue(): string {
    return this.props.name;
  }

  public static create(props: OrgNameProps): Result<OrgName> {
    const result = Guard.againstNullOrUndefined(props.name, "name");
    if (!result.succeeded) {
      return Result.fail<OrgName>(result.message);
    }
    const greaterEnough = Validation.valueGreaterThanLimit(
      this.MIN_LENGTH,
      props.name
    );
    if (!greaterEnough) {
      return Result.fail<OrgName>("組織名は最小2文字です");
    }

    const lessEnough = Validation.valueLessThanLimit(
      this.MAX_LENGTH,
      props.name
    );
    if (!lessEnough) {
      return Result.fail<OrgName>("組織名は最大30文字です");
    }

    return Result.success<OrgName>(new OrgName(props));
  }
  public static restoreFromRepo(name: string): OrgName {
    return new OrgName({ name });
  }
}
