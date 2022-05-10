import { Nothing } from "../../shared/core";
import { UniqueEntityId } from "../../shared/domain";
import { Inquiry } from "./Inquiry";
import { InquiryStatus } from "./InquiryStatus";

export interface IInquiryRepo {
  getInquiry(inquiryId: UniqueEntityId): Promise<Inquiry | false>;
  getInquiryTreeById(treeId: UniqueEntityId): Promise<Inquiry[] | false>;
  getInquiriesByOrgId(
    orgId: UniqueEntityId,
    limit: number,
    endCursor: UniqueEntityId | Nothing
  ): Promise<Inquiry[] | false>;
  getInquiriesWithStatusByOrgId(
    orgId: UniqueEntityId,
    status: InquiryStatus,
    limit: number,
    endCursor: UniqueEntityId | Nothing
  ): Promise<Inquiry[] | false>;
  registerInquiry(inquiry: Inquiry): Promise<Inquiry>;
  updateInquiryStatus(
    inquiryId: UniqueEntityId,
    status: InquiryStatus
  ): Promise<Inquiry>;
}
