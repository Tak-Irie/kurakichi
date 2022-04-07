import { Result } from "../../shared copy/Result";
import { ValueObject } from "../../shared copy/domain/ValueObject";

type GeocodeProps = { code: number };

export class Geocode extends ValueObject<GeocodeProps> {
  private constructor(readonly props: GeocodeProps) {
    super(props);
  }
  public getValue(): number {
    return this.props.code;
  }
  public static create(props: GeocodeProps): Result<Geocode> {
    const isValid = Geocode.validateProps(props);
    if (isValid === false) {
      return Result.fail<Geocode>("ジオコード:形式が正しく有りません");
    }
    const geocode = new Geocode({
      ...props,
    });
    return Result.success<Geocode>(geocode);
  }

  private static validateProps(props: GeocodeProps): boolean {
    const geoRegExp = /^[0-9]*\.[0-9]*/;
    const result = geoRegExp.test(props.code.toString());
    return result;
  }

  /**
   * only used for data mapper in infra layer
   */
  public static restoreFromRepo(code: number): Geocode {
    const geocode = new Geocode({ code });
    return geocode;
  }
}
