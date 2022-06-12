import { OrgRepo } from '../infra';
import { InquiryModel, OrgPrivateModel } from './OrgReadModel';

export const getOrgPrivateInfoByCookieAndId = async (
  orgId: string,
  memberId: string,
): Promise<OrgPrivateModel | false> => {
  // console.log('orgId:', orgId);
  // console.log('memberId:', memberId);
  const orgRepo = new OrgRepo();
  const res = await orgRepo.getOrgPrivateInfoTemp(orgId, memberId);

  if (res === false) return false;
  const { inquiries, ...rest } = res;
  const _inq: InquiryModel[] = inquiries.map((inq) => {
    const { status, receivedOrgId, receiver } = inq;
    return {
      inquiryStatus: status,
      receivedOrg: { id: receivedOrgId },
      replier: receiver,
      ...inq,
    };
  });

  return { inquiries: _inq, ...rest };
};
