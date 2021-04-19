import { Left } from '@kurakichi/domain';

export const returnErrorToGQL = (result: Left<any, any>) => {
  return { error: { message: result.value.getErrorValue() } };
};
