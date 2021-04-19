import { OrgRepo } from '../infra/OrgRepo';
import { InquiryRepo } from '../infra/InquiryRepo';

import { RegisterOrgUseCase } from './registerOrg//RegisterOrgUseCase';
import { GetOrgsUseCase } from './getOrgs/getOrgsUseCase';
import { GetOrgUseCase } from './getOrg/getOrgUseCase';
import { AcceptJoinOrgUseCase } from './acceptJoinOrg/acceptJoinOrgUseCase';
import { RequestJoinOrgUseCase } from './requestJoinOrg/requestJoinOrgUseCase';

import { GetInquiryUseCase } from './getInquiry/getInquiryUseCase';
import { GetInquiriesUseCase } from './getInquiries/getInquiriesUseCase';
import { RegisterInquiryUseCase } from './registerInquiry/registerInquiryUseCase';

const orgRepo = new OrgRepo();
const inquiryRepo = new InquiryRepo();

export const useRegisterOrgUseCase = new RegisterOrgUseCase(orgRepo);
export const useGetOrgsUseCase = new GetOrgsUseCase(orgRepo);
export const useGetOrgUseCase = new GetOrgUseCase(orgRepo);
export const useAcceptJoinOrgUseCase = new AcceptJoinOrgUseCase(orgRepo);
export const useRequestJoinOrgUseCase = new RequestJoinOrgUseCase(orgRepo);

export const useGetInquiryUseCase = new GetInquiryUseCase(inquiryRepo);
export const useGetInquiriesUseCase = new GetInquiriesUseCase(inquiryRepo);
export const useRegisterInquiryUseCase = new RegisterInquiryUseCase(inquiryRepo);

export * from './DTOInquiry';
export * from './DTOOrg';
