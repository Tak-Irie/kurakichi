import { OrgRepo } from '../infra/OrgRepo';
import { InquiryRepo } from '../infra/InquiryRepo';

import { RegisterOrgUseCase } from './registerOrg//RegisterOrgUseCase';
import { GetOrgsUseCase } from './getOrgs/getOrgsUseCase';
import { GetOrgUseCase } from './getOrg/getOrgUseCase';
import { AcceptJoinOrgUseCase } from './acceptJoinOrg/acceptJoinOrgUseCase';
import { RequestJoinOrgUseCase } from './requestJoinOrg/requestJoinOrgUseCase';
import { GetOrgsByMemberIdUseCase } from './getOrgsByMemberId/GetOrgsByMemberIdUseCase';

import { GetInquiryUseCase } from './getInquiry/getInquiryUseCase';
import { GetInquiriesUseCase } from './getInquiries/getInquiriesUseCase';
import { GetInquiriesByTreeIdUseCase } from './getInquiriesByTreeId/GetInquiriesByTreeIdUseCase';
import { RegisterInquiryUseCase } from './registerInquiry/registerInquiryUseCase';
import { GetInquiriesWithStatusByOrgIdUseCase } from './getInquiriesWithStatusByOrgId/GetInquiriesWithStatusByOrgIdUseCase';
import { ReplyInquiryUseCase } from './replyInquiry/ReplyInquiryUseCase';

const orgRepo = new OrgRepo();
const inquiryRepo = new InquiryRepo();

export const useRegisterOrgUseCase = new RegisterOrgUseCase(orgRepo);
export const useGetOrgsUseCase = new GetOrgsUseCase(orgRepo);
export const useGetOrgUseCase = new GetOrgUseCase(orgRepo);
export const useAcceptJoinOrgUseCase = new AcceptJoinOrgUseCase(orgRepo);
export const useRequestJoinOrgUseCase = new RequestJoinOrgUseCase(orgRepo);
export const useGetOrgsByMemberIdUseCase = new GetOrgsByMemberIdUseCase(orgRepo);

export const useGetInquiryUseCase = new GetInquiryUseCase(inquiryRepo);
export const useGetInquiriesUseCase = new GetInquiriesUseCase(inquiryRepo);
export const useGetInquiriesByTreeIdUseCase = new GetInquiriesByTreeIdUseCase(inquiryRepo, orgRepo);
export const useRegisterInquiryUseCase = new RegisterInquiryUseCase(inquiryRepo);
export const useGetInquiriesWithStatusByOrgIdUseCase = new GetInquiriesWithStatusByOrgIdUseCase(
  inquiryRepo,
);
export const useReplyInquiryUseCase = new ReplyInquiryUseCase(inquiryRepo);

export * from './DTOInquiry';
export * from './DTOOrg';
