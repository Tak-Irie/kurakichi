import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

type LocationProps = { location: string };

export class Location extends ValueObject<LocationProps> {
  private constructor(readonly props: LocationProps) {
    super(props);
  }

  public getValue(): string {
    return this.props.location;
  }

  public static create(props: LocationProps): Result<Location> {
    if (!this.validateLocationProps(props)) {
      return Result.fail<Location>('住所の値が不正です。');
    }

    const _Location = new Location({
      ...props,
    });
    return Result.success<Location>(_Location);
  }

  private static validateLocationProps(unidentifiedLocation: LocationProps): boolean {
    if (unidentifiedLocation.location === 'UNKNOWN') return true;
    // FIXME:need validation
    // const isValid = someValidator(unidentifiedLocation);
    // if (isValid === false) return false;

    return true;
  }

  /**
   * only used for data mapper in infra layer
   */
  public static restoreFromRepo(props: LocationProps): Location {
    const _Location = new Location(props);
    return _Location;
  }
}
