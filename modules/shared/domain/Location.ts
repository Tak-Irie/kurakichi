import { Result } from "../../shared copy/Result";
import { ValueObject } from "../../shared copy/domain/ValueObject";

type LocationProps = { location: string };

export class Location extends ValueObject<LocationProps> {
  private constructor(readonly props: LocationProps) {
    super(props);
  }

  public getValue(): string {
    return this.props.location;
  }

  public static create(props: LocationProps): Result<Location> {
    // console.log('locationCreate:', props);
    const location = this.transformZenkakuToHankaku(props.location);
    // console.log('transformed:', location);
    const isValid = this.validateAndModifyProps({ location });
    if (isValid === false) {
      return Result.fail<Location>("住所の値が不正です。");
    }

    const _Location = new Location({
      location: isValid,
    });
    // console.log('_L:', _Location.getValue());
    return Result.success<Location>(_Location);
  }

  private static validateAndModifyProps(
    unpurifiedLocation: LocationProps
  ): string | false {
    const locationRegExp =
      /(\d{3}-?\d{4})([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]*\s?\d?-?\d?-?\d?)(\s?[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf\d-])?/;

    const isValid = locationRegExp.test(unpurifiedLocation.location);
    if (!isValid) return false;

    const purified = unpurifiedLocation.location
      .trim()
      .replace(locationRegExp, "$1$2$3");

    return purified;
  }

  private static transformZenkakuToHankaku(zenkakuLocation: string): string {
    if (zenkakuLocation.includes("丁目")) {
      if (zenkakuLocation.match(/丁目(=?[\uFF10-\uFF19])/)) {
        zenkakuLocation = zenkakuLocation.replace("丁目", "-");
      } else {
        zenkakuLocation = zenkakuLocation.replace("丁目", "");
      }
    }
    return zenkakuLocation.replace(/[\uFF01-\uFF5E]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  }

  /**
   * only used for data mapper in infra layer
   */
  public static restoreFromRepo(props: LocationProps): Location {
    const _Location = new Location(props);
    return _Location;
  }
}
