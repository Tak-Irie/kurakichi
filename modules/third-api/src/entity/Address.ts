import { Result } from '@kurakichi/domain/src/shared/core';
import { ValueObject } from '@kurakichi/domain/src/shared/domain/ValueObject';
import { JapaneseAddressRegExp } from '@kurakichi/domain/src/shared/util';

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

  // FIXME: temp impl, will convert to in-mem redis store
  // public static async getAddressFromPostcode(
  //   postcode: string,
  // ): Promise<string | false> {
  //   try {
  //     const prefCode = postcode.getPostcode().slice(0, 3);
  //     const localCode = postcode.getPostcode().slice(-4);
  //     const addresses = await import(`../staticData/localAreas/${prefCode}`);
  //     if (addresses === undefined) return false;
  //     const data = addresses.default[localCode];
  //     const pref = prefectures[data[0]];
  //     const result = pref + data[1] + data[2] + (data[3] || '');
  //     if (typeof result !== 'string') false;

  //     return result;
  //   } catch (err: any) {
  //     console.log('err:', err);
  //     return false;
  //   }
  // }

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
}
