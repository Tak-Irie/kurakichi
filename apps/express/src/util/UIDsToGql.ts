import { UniqueEntityId } from '@kurakichi/domain';

export const UIDsToGql = (uids: UniqueEntityId[]) => {
  // console.log('uids:', uids);
  return uids.map((uid) => {
    return { id: uid.getId() };
  });
};
