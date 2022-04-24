import { PostcodeRegExp } from '@kurakichi/domain';

type Postcode = {
  postcode: string;
};

export const createPostcode = (postcode: string): Postcode | false => {
  if (postcode.length > 8) false;
  if (PostcodeRegExp.test(postcode) === false) return false;
  const Postcode: Postcode = {
    postcode,
  };
  return Postcode;
};
