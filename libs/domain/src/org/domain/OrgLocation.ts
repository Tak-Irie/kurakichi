import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

type OrgLocationProps = {
  location: string;
};

// FIXME:add verifier Address line 1/Administrative/Postal/Language
// https://developers.google.com/my-business/content/japan-address-format-spec?hl=ja#example-1
export class OrgLocation extends ValueObject<OrgLocationProps> {
  constructor(readonly props: OrgLocationProps) {
    super(props);
  }
  public getValue(): string {
    return this.props.location;
  }
  public static create(props: OrgLocationProps): Result<OrgLocation> {
    const _OrgLocation = new OrgLocation({
      ...props,
    });
    return Result.success<OrgLocation>(_OrgLocation);
  }
}
