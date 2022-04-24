class PostcodeAPI {
  getAddressFromPostcode = async (
    postcode: string,
  ): Promise<string | false> => {
    try {
      const prefCode = postcode.getPostcode().slice(0, 3);
      const localCode = postcode.getPostcode().slice(-4);
      const addresses = await import(`../staticData/localAreas/${prefCode}`);
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
  };
}
