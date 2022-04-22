import { OrgRepo } from '../infra';
import { OrgReadModel } from './OrgReadModel';

export const getOrgPublicInfoById = async (
  orgId: string,
): Promise<OrgReadModel | false> => {
  const orgRepo = new OrgRepo();
  const res = await orgRepo.getOrgPublicInfoTemp(orgId);

  if (res === false) return false;
  return res;
};
