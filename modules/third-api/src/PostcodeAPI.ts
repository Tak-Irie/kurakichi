import { PostcodeRegExp } from '@kurakichi/domain';
import prefectures from './staticData/prefectures';

type Postcode = {
  postcode: string;
};

export class PostcodeAPI {
  private static createPostcode(postcode: string): Postcode | false {
    if (postcode.length > 8) false;
    if (PostcodeRegExp.test(postcode) === false) return false;
    const Postcode: Postcode = {
      postcode,
    };
    return Postcode;
  }
  public static async getAddressByPostcode(
    postcode: string,
  ): Promise<string | false> {
    try {
      const validPostcode = this.createPostcode(postcode);
      if (validPostcode === false) return false;

      const prefCode = validPostcode.postcode.slice(0, 3);
      const localCode = validPostcode.postcode.slice(-4);
      const addresses = await import(`./staticData/localAreas/${prefCode}`);
      if (addresses === undefined) return false;

      const data = addresses.default[localCode];
      const pref = prefectures[data[0]];
      const result = pref + data[1] + data[2] + (data[3] || '');
      if (typeof result !== 'string') false;

      return result;
    } catch (err: any) {
      console.log('err:', err);
      return false;
    }
  }
}
