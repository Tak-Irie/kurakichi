import { OrgRepo } from "../infra/OrgRepo";
import { InquiryRepo } from "../infra/InquiryRepo";

import { RegisterOrgUsecase } from "./registerOrg/RegisterOrgUsecase";
import { GetOrgsUsecase } from "./getOrgs/getOrgsUsecase";
import { GetOrgUsecase } from "./getOrg/getOrgUsecase";
import { AcceptJoinOrgUsecase } from "./acceptJoinOrg/acceptJoinOrgUsecase";
import { RequestJoinOrgUsecase } from "./requestJoinOrg/requestJoinOrgUsecase";
import { GetOrgsByMemberIdUsecase } from "./getOrgsByMemberId/GetOrgsByMemberIdUsecase";
import { UpdateOrgUsecase } from "./updateOrg/UpdateOrgUsecase";

import { GetInquiryUsecase } from "./getInquiry/getInquiryUsecase";
import { GetInquiriesUsecase } from "./getInquiries/getInquiriesUsecase";
import { GetInquiriesByTreeIdUsecase } from "./getInquiriesByTreeId/GetInquiriesByTreeIdUsecase";
import { RegisterInquiryUsecase } from "./registerInquiry/registerInquiryUsecase";
import { GetInquiriesWithStatusByOrgIdUsecase } from "./getInquiriesWithStatusByOrgId/GetInquiriesWithStatusByOrgIdUsecase";
import { ReplyInquiryUsecase } from "./replyInquiry/ReplyInquiryUsecase";
import { UpdateInquiryStatusUsecase } from "./updateInquiryStatus/UpdateInquiryStatusUsecase";

const orgRepo = new OrgRepo();
const inquiryRepo = new InquiryRepo();

export const useRegisterOrgUsecase = new RegisterOrgUsecase(orgRepo);
export const useGetOrgsUsecase = new GetOrgsUsecase(orgRepo);
export const useGetOrgUsecase = new GetOrgUsecase(orgRepo);
export const useAcceptJoinOrgUsecase = new AcceptJoinOrgUsecase(orgRepo);
export const useRequestJoinOrgUsecase = new RequestJoinOrgUsecase(orgRepo);
export const useGetOrgsByMemberIdUsecase = new GetOrgsByMemberIdUsecase(
  orgRepo
);
export const useUpdateOrgUsecase = new UpdateOrgUsecase(orgRepo);

export const useGetInquiryUsecase = new GetInquiryUsecase(inquiryRepo);
export const useGetInquiriesUsecase = new GetInquiriesUsecase(inquiryRepo);
export const useGetInquiriesByTreeIdUsecase = new GetInquiriesByTreeIdUsecase(
  inquiryRepo,
  orgRepo
);
export const useRegisterInquiryUsecase = new RegisterInquiryUsecase(
  inquiryRepo
);
export const useGetInquiriesWithStatusByOrgIdUsecase =
  new GetInquiriesWithStatusByOrgIdUsecase(inquiryRepo);
export const useReplyInquiryUsecase = new ReplyInquiryUsecase(inquiryRepo);
export const useUpdateInquiryStatusUsecase = new UpdateInquiryStatusUsecase(
  inquiryRepo
);

export * from "./DTOInquiry";
export * from "./DTOOrg";
