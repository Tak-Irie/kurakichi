import { Result } from '../core';
import { JapaneseAddressRegExp, PostcodeRegExp } from '../util';
import { ValueObject } from './ValueObject';

type AddressProps = { address: string };

export class Address extends ValueObject<AddressProps> {
  private constructor(readonly props: AddressProps) {
    super(props);
  }

  public getValue(): string {
    return this.props.address;
  }

  public static create(props: AddressProps): Result<Address> {
    // console.log('addressCreate:', props);
    const address = this.transformZenkakuToHankaku(props.address);
    // console.log('transformed:', address);
    const isValid = this.validateAndModifyProps({ address });
    if (isValid === false) {
      return Result.fail<Address>('住所の値が不正です。');
    }

    const _Address = new Address({
      address: isValid,
    });
    // console.log('_L:', _Address.getValue());
    return Result.success<Address>(_Address);
  }

  public static async getAddressFromPostcode(
    postcode: string,
  ): Promise<string | false> {
    if (postcode.length > 8) return false;
    if (PostcodeRegExp.test(postcode) === false) return false;
    const pref = postcode.slice(0, 3);
    const local = await import(`../data/${pref}.js`);

    return '';
  }

  private static validateAndModifyProps(
    unpurifiedAddress: AddressProps,
  ): string | false {
    const isValid = JapaneseAddressRegExp.test(unpurifiedAddress.address);
    if (!isValid) return false;

    const purified = unpurifiedAddress.address
      .trim()
      .replace(JapaneseAddressRegExp, '$1$2$3');

    return purified;
  }

  private static transformZenkakuToHankaku(zenkakuAddress: string): string {
    if (zenkakuAddress.includes('丁目')) {
      if (zenkakuAddress.match(/丁目(=?[\uFF10-\uFF19])/)) {
        zenkakuAddress = zenkakuAddress.replace('丁目', '-');
      } else {
        zenkakuAddress = zenkakuAddress.replace('丁目', '');
      }
    }
    return zenkakuAddress.replace(/[\uFF01-\uFF5E]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  }

  /**
   * only used for data mapper in infra layer
   */
  public static restoreFromRepo(props: AddressProps): Address {
    const _Address = new Address(props);
    return _Address;
  }
}
