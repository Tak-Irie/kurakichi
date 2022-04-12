import { OrgRepo } from "../infra/OrgRepo";
import { InquiryRepo } from "../infra/InquiryRepo";

import { RegisterOrgUsecase } from "./RegisterOrg/RegisterOrgUseCase";
import { GetOrgsUsecase } from "./GetOrgs/GetOrgsUseCase";
import { GetOrgUsecase } from "./GetOrg/GetOrgUseCase";
import { AcceptJoinOrgUsecase } from "./AcceptJoinOrg/AcceptJoinOrgUseCase";
import { RequestJoinOrgUsecase } from "./RequestJoinOrg/RequestJoinOrgUseCase";
import { GetOrgsByMemberIdUsecase } from "./GetOrgsByMemberId/GetOrgsByMemberIdUseCase";
import { UpdateOrgUsecase } from "./UpdateOrg/UpdateOrgUseCase";

import { GetInquiryUsecase } from "./GetInquiry/GetInquiryUseCase";
import { GetInquiriesUsecase } from "./GetInquiries/GetInquiriesUseCase";
import { GetInquiriesByTreeIdUsecase } from "./GetInquiriesByTreeId/GetInquiriesByTreeIdUseCase";
import { RegisterInquiryUsecase } from "./RegisterInquiry/RegisterInquiryUseCase";
import { GetInquiriesWithStatusByOrgIdUsecase } from "./GetInquiriesWithStatusByOrgId/GetInquiriesWithStatusByOrgIdUseCase";
import { ReplyInquiryUsecase } from "./ReplyInquiry/ReplyInquiryUseCase";
import { UpdateInquiryStatusUsecase } from "./UpdateInquiryStatus/UpdateInquiryStatusUseCase";

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
